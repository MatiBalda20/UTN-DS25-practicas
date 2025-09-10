import { prisma } from '../lib/prisma';
import { User, CreateUserInput, UpdateUserInput } from '../types';
import bcrypt from 'bcrypt';

export class UserService {
    private readonly SALT_ROUNDS = 10;

    // Obtener todos los usuarios (sin contraseñas)
    async getAllUsers(): Promise<Omit<User, 'password'>[]> {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Remover contraseñas antes de devolver
        return users.map(({ password, ...user }) => user);
    }

    // Obtener usuario por ID (sin contraseña)
    async getUserById(id: string): Promise<Omit<User, 'password'> | null> {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) return null;

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    // Obtener usuario por email (con contraseña - para login)
    async getUserByEmail(email: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { email }
        });
    }

    // Crear nuevo usuario
    async createUser(userData: CreateUserInput): Promise<Omit<User, 'password'>> {
        // Verificar si el email ya existe
        const existingUser = await prisma.user.findUnique({
            where: { email: userData.email }
        });

        if (existingUser) {
            throw new Error('El email ya está registrado');
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(userData.password, this.SALT_ROUNDS);

        // Crear usuario
        const user = await prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword
            }
        });

        // Devolver usuario sin contraseña
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    // Actualizar usuario
    async updateUser(id: string, updateData: UpdateUserInput): Promise<Omit<User, 'password'> | null> {
        try {
            // Si se está actualizando la contraseña, hashearla
            if (updateData.password) {
                updateData.password = await bcrypt.hash(updateData.password, this.SALT_ROUNDS);
            }

            // Si se está actualizando el email, verificar que no exista
            if (updateData.email) {
                const existingUser = await prisma.user.findFirst({
                    where: {
                        email: updateData.email,
                        NOT: { id }
                    }
                });

                if (existingUser) {
                    throw new Error('El email ya está en uso');
                }
            }

            const user = await prisma.user.update({
                where: { id },
                data: updateData
            });

            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch (error) {
            if (error instanceof Error && error.message.includes('email')) {
                throw error;
            }
            return null;
        }
    }

    // Eliminar usuario
    async deleteUser(id: string): Promise<boolean> {
        try {
            await prisma.user.delete({
                where: { id }
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    // Verificar contraseña (para login futuro)
    async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    // Login (básico - sin JWT por ahora)
    async login(email: string, password: string): Promise<Omit<User, 'password'> | null> {
        const user = await this.getUserByEmail(email);
        
        if (!user) {
            return null;
        }

        const isPasswordValid = await this.verifyPassword(password, user.password);
        
        if (!isPasswordValid) {
            return null;
        }

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}
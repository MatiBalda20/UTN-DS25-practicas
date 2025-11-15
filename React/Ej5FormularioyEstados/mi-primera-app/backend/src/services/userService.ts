// src/services/userService.ts
import { prisma } from '../lib/prisma';
import { User, CreateUserInput, UpdateUserInput } from '../types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {
    private readonly SALT_ROUNDS = 10;

    async getAllUsers(): Promise<Omit<User, 'password'>[]> {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return users.map(({ password, ...user }) => user);
    }

    async getUserById(id: string): Promise<Omit<User, 'password'> | null> {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) return null;

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { email }
        });
    }

    async createUser(userData: CreateUserInput & { role?: 'USER' | 'ADMIN' }): Promise<Omit<User, 'password'>> {
        const existingUser = await prisma.user.findUnique({
            where: { email: userData.email }
        });

        if (existingUser) {
            throw new Error('El email ya está registrado');
        }

        const hashedPassword = await bcrypt.hash(userData.password, this.SALT_ROUNDS);

        const user = await prisma.user.create({
            data: {
                nombre: userData.nombre,
                apellido: userData.apellido,
                email: userData.email,
                password: hashedPassword,
                fechaNacimiento: userData.fechaNacimiento,
                role: userData.role || 'USER'
            }
        });

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async updateUser(id: string, updateData: UpdateUserInput): Promise<Omit<User, 'password'> | null> {
        try {
            if (updateData.password) {
                updateData.password = await bcrypt.hash(updateData.password, this.SALT_ROUNDS);
            }

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

    async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    // Login con JWT
    async login(email: string, password: string): Promise<{ user: Omit<User, 'password'>, token: string } | null> {
        const user = await this.getUserByEmail(email);
        
        if (!user) {
            return null;
        }

        const isPasswordValid = await this.verifyPassword(password, user.password);
        
        if (!isPasswordValid) {
            return null;
        }

        // Generar JWT
        const token = (jwt as any).sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
                },
                process.env.JWT_SECRET!, // Asegurar que es string
                { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } // Valor por defecto
        );
        const { password: _, ...userWithoutPassword } = user;
        
        return {
            user: userWithoutPassword,
            token
        };
    }
}
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_1 = require("../lib/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    constructor() {
        this.SALT_ROUNDS = 10;
    }
    // Obtener todos los usuarios (sin contraseñas)
    async getAllUsers() {
        const users = await prisma_1.prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        // Remover contraseñas antes de devolver
        return users.map(({ password, ...user }) => user);
    }
    // Obtener usuario por ID (sin contraseña)
    async getUserById(id) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id }
        });
        if (!user)
            return null;
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    // Obtener usuario por email (con contraseña - para login)
    async getUserByEmail(email) {
        return await prisma_1.prisma.user.findUnique({
            where: { email }
        });
    }
    // Crear nuevo usuario
    async createUser(userData) {
        // Verificar si el email ya existe
        const existingUser = await prisma_1.prisma.user.findUnique({
            where: { email: userData.email }
        });
        if (existingUser) {
            throw new Error('El email ya está registrado');
        }
        // Hash de la contraseña
        const hashedPassword = await bcrypt_1.default.hash(userData.password, this.SALT_ROUNDS);
        // Crear usuario
        const user = await prisma_1.prisma.user.create({
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
    async updateUser(id, updateData) {
        try {
            // Si se está actualizando la contraseña, hashearla
            if (updateData.password) {
                updateData.password = await bcrypt_1.default.hash(updateData.password, this.SALT_ROUNDS);
            }
            // Si se está actualizando el email, verificar que no exista
            if (updateData.email) {
                const existingUser = await prisma_1.prisma.user.findFirst({
                    where: {
                        email: updateData.email,
                        NOT: { id }
                    }
                });
                if (existingUser) {
                    throw new Error('El email ya está en uso');
                }
            }
            const user = await prisma_1.prisma.user.update({
                where: { id },
                data: updateData
            });
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        catch (error) {
            if (error instanceof Error && error.message.includes('email')) {
                throw error;
            }
            return null;
        }
    }
    // Eliminar usuario
    async deleteUser(id) {
        try {
            await prisma_1.prisma.user.delete({
                where: { id }
            });
            return true;
        }
        catch (error) {
            return false;
        }
    }
    // Verificar contraseña (para login futuro)
    async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt_1.default.compare(plainPassword, hashedPassword);
    }
    // Login (básico - sin JWT por ahora)
    async login(email, password) {
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
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map
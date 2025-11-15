"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
// src/services/userService.ts
const prisma_1 = require("../lib/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    constructor() {
        this.SALT_ROUNDS = 10;
    }
    async getAllUsers() {
        const users = await prisma_1.prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return users.map(({ password, ...user }) => user);
    }
    async getUserById(id) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id }
        });
        if (!user)
            return null;
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async getUserByEmail(email) {
        return await prisma_1.prisma.user.findUnique({
            where: { email }
        });
    }
    async createUser(userData) {
        const existingUser = await prisma_1.prisma.user.findUnique({
            where: { email: userData.email }
        });
        if (existingUser) {
            throw new Error('El email ya está registrado');
        }
        const hashedPassword = await bcrypt_1.default.hash(userData.password, this.SALT_ROUNDS);
        const user = await prisma_1.prisma.user.create({
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
    async updateUser(id, updateData) {
        try {
            if (updateData.password) {
                updateData.password = await bcrypt_1.default.hash(updateData.password, this.SALT_ROUNDS);
            }
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
    async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt_1.default.compare(plainPassword, hashedPassword);
    }
    // Login con JWT
    async login(email, password) {
        const user = await this.getUserByEmail(email);
        if (!user) {
            return null;
        }
        const isPasswordValid = await this.verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        // Generar JWT
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET, // Asegurar que es string
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } // Valor por defecto
        );
        const { password: _, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            token
        };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map
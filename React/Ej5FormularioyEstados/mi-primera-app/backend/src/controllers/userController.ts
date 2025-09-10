// src/controllers/userController.ts
import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { UserResponse, LoginResponse } from '../types';

const userService = new UserService();

export class UserController {
    // GET /api/users
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await userService.getAllUsers();
            const response: UserResponse = {
                success: true,
                data: users,
                count: users.length
            };
            res.json(response);
        } catch (error) {
            const response: UserResponse = {
                success: false,
                message: 'Error al obtener los usuarios',
                error: error instanceof Error ? error.message : 'Error desconocido'
            };
            res.status(500).json(response);
        }
    }

    // GET /api/users/:id - CON VALIDACIÓN ZOD
    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params; // Ya validado por Zod (UUID válido)
            const user = await userService.getUserById(id);

            if (!user) {
                const response: UserResponse = {
                    success: false,
                    message: 'Usuario no encontrado'
                };
                res.status(404).json(response);
                return;
            }

            const response: UserResponse = {
                success: true,
                data: user
            };
            res.json(response);
        } catch (error) {
            const response: UserResponse = {
                success: false,
                message: 'Error al obtener el usuario',
                error: error instanceof Error ? error.message : 'Error desconocido'
            };
            res.status(500).json(response);
        }
    }

    // POST /api/users/register - CON VALIDACIÓN ZOD ✅
    async register(req: Request, res: Response): Promise<void> {
        try {
            // Los datos ya están validados y transformados por el middleware de Zod
            const userData = req.body;

            console.log('Datos de usuario validados por Zod:', userData);

            const newUser = await userService.createUser(userData);
            
            const response: UserResponse = {
                success: true,
                data: newUser,
                message: 'Usuario registrado exitosamente'
            };
            res.status(201).json(response);
        } catch (error) {
            if (error instanceof Error && error.message.includes('email')) {
                const response: UserResponse = {
                    success: false,
                    message: error.message
                };
                res.status(400).json(response);
                return;
            }

            console.error('Error en register:', error);
            const response: UserResponse = {
                success: false,
                message: 'Error al registrar el usuario',
                error: error instanceof Error ? error.message : 'Error desconocido'
            };
            res.status(500).json(response);
        }
    }

    // POST /api/users/login - CON VALIDACIÓN ZOD ✅
    async login(req: Request, res: Response): Promise<void> {
        try {
            // Los datos ya están validados por Zod
            const { email, password } = req.body;

            console.log('Datos de login validados por Zod:', { email: email, password: '[HIDDEN]' });

            const user = await userService.login(email, password);

            if (!user) {
                const response: LoginResponse = {
                    success: false,
                    message: 'Email o contraseña incorrectos'
                };
                res.status(401).json(response);
                return;
            }

            const response: LoginResponse = {
                success: true,
                data: user,
                message: 'Login exitoso'
            };
            res.json(response);
        } catch (error) {
            const response: LoginResponse = {
                success: false,
                message: 'Error al iniciar sesión',
                error: error instanceof Error ? error.message : 'Error desconocido'
            };
            res.status(500).json(response);
        }
    }

    // PUT /api/users/:id - CON VALIDACIÓN ZOD
    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params; // Ya validado por Zod (UUID válido)
            const updateData = req.body; // Ya validado por Zod

            console.log('Datos de actualización validados por Zod:', updateData);

            const updatedUser = await userService.updateUser(id, updateData);

            if (!updatedUser) {
                const response: UserResponse = {
                    success: false,
                    message: 'Usuario no encontrado'
                };
                res.status(404).json(response);
                return;
            }

            const response: UserResponse = {
                success: true,
                data: updatedUser,
                message: 'Usuario actualizado exitosamente'
            };
            res.json(response);
        } catch (error) {
            if (error instanceof Error && error.message.includes('email')) {
                const response: UserResponse = {
                    success: false,
                    message: error.message
                };
                res.status(400).json(response);
                return;
            }

            const response: UserResponse = {
                success: false,
                message: 'Error al actualizar el usuario',
                error: error instanceof Error ? error.message : 'Error desconocido'
            };
            res.status(500).json(response);
        }
    }

    // DELETE /api/users/:id - CON VALIDACIÓN ZOD
    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params; // Ya validado por Zod (UUID válido)
            const deleted = await userService.deleteUser(id);

            if (!deleted) {
                const response: UserResponse = {
                    success: false,
                    message: 'Usuario no encontrado'
                };
                res.status(404).json(response);
                return;
            }

            const response: UserResponse = {
                success: true,
                message: 'Usuario eliminado exitosamente'
            };
            res.json(response);
        } catch (error) {
            const response: UserResponse = {
                success: false,
                message: 'Error al eliminar el usuario',
                error: error instanceof Error ? error.message : 'Error desconocido'
            };
            res.status(500).json(response);
        }
    }
}
import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { UserResponse, LoginResponse } from '../types';

const userService = new UserService();

export class UserController {
    // POST /api/users/register
    async register(req: Request, res: Response): Promise<void> {
        try {
            const userData = req.body;
            console.log('📝 Registrando usuario:', userData.email);

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

            console.error('❌ Error en register:', error);
            const response: UserResponse = {
                success: false,
                message: 'Error al registrar el usuario',
                error: error instanceof Error ? error.message : 'Error desconocido'
            };
            res.status(500).json(response);
        }
    }

    // POST /api/users/login - LOGIN CON JWT
    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            console.log('🔐 Intentando login:', email);

            const result = await userService.login(email, password);

            if (!result) {
                const response: LoginResponse = {
                    success: false,
                    message: 'Email o contraseña incorrectos'
                };
                res.status(401).json(response);
                return;
            }

            console.log('✅ Login exitoso:', email);
            const response: LoginResponse = {
                success: true,
                data: result,
                message: 'Login exitoso'
            };
            res.json(response);
        } catch (error) {
            console.error('❌ Error en login:', error);
            const response: LoginResponse = {
                success: false,
                message: 'Error al iniciar sesión',
                error: error instanceof Error ? error.message : 'Error desconocido'
            };
            res.status(500).json(response);
        }
    }

    // GET /api/users - Solo ADMIN
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

    // GET /api/users/:id - Solo ADMIN
    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
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

    // PUT /api/users/:id - Solo ADMIN
    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updateData = req.body;

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

    // DELETE /api/users/:id - Solo ADMIN
    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
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
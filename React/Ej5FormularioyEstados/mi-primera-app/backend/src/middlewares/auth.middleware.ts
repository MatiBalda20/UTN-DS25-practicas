import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extender tipo Request
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                role: 'USER' | 'ADMIN';
            }
        }
    }
}

// Middleware de autenticación: verificar JWT
export function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        // 1. Obtener token del header
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ 
                success: false, 
                message: 'Token no proporcionado' 
            });
            return;
        }

        const token = authHeader.split(' ')[1];

        // 2. Verificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

        // 3. Agregar usuario al request
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };

        next();
    } catch (error: any) {
        console.error('Error en authenticate:', error);
        
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ 
                success: false, 
                message: 'Token expirado' 
            });
            return;
        }
        
        res.status(401).json({ 
            success: false, 
            message: 'Token inválido' 
        });
    }
}

// Middleware de autorización: verificar roles
export function authorize(...allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'No autenticado'
            });
            return;
        }

        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: 'No tienes permisos para esta acción'
            });
            return;
        }

        next();
    };
}
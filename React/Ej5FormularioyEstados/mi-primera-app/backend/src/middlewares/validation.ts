// src/middlewares/validation.ts
import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validateBody = (schema: ZodSchema<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            // Validar y transformar el body
            req.body = schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.issues.map((err: any) => ({
                    field: err.path.join('.'),
                    message: err.message
                }));
                
                res.status(400).json({
                    success: false,
                    message: 'Datos de entrada inválidos',
                    errors: errors,
                    details: errors.map((err: any) => `${err.field}: ${err.message}`).join(', ')
                });
                return;
            }
            
            res.status(500).json({
                success: false,
                message: 'Error de validación interno'
            });
        }
    };
};

export const validateParams = (schema: ZodSchema<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedParams = schema.parse(req.params);
            req.params = validatedParams as any;
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.issues.map((err: any) => ({
                    field: err.path.join('.'),
                    message: err.message
                }));
                
                res.status(400).json({
                    success: false,
                    message: 'Parámetros inválidos',
                    errors: errors
                });
                return;
            }
            
            res.status(500).json({
                success: false,
                message: 'Error de validación interno'
            });
        }
    };
};

export const validateQuery = (schema: ZodSchema<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedQuery = schema.parse(req.query);
            req.query = validatedQuery as any;
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.issues.map((err: any) => ({
                    field: err.path.join('.'),
                    message: err.message
                }));
                
                res.status(400).json({
                    success: false,
                    message: 'Parámetros de consulta inválidos',
                    errors: errors
                });
                return;
            }
            
            res.status(500).json({
                success: false,
                message: 'Error de validación interno'
            });
        }
    };
};
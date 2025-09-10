"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = exports.validateParams = exports.validateBody = void 0;
const zod_1 = require("zod");
const validateBody = (schema) => {
    return (req, res, next) => {
        try {
            // Validar y transformar el body
            req.body = schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errors = error.issues.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message
                }));
                res.status(400).json({
                    success: false,
                    message: 'Datos de entrada inválidos',
                    errors: errors,
                    details: errors.map((err) => `${err.field}: ${err.message}`).join(', ')
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
exports.validateBody = validateBody;
const validateParams = (schema) => {
    return (req, res, next) => {
        try {
            const validatedParams = schema.parse(req.params);
            req.params = validatedParams;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errors = error.issues.map((err) => ({
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
exports.validateParams = validateParams;
const validateQuery = (schema) => {
    return (req, res, next) => {
        try {
            const validatedQuery = schema.parse(req.query);
            req.query = validatedQuery;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errors = error.issues.map((err) => ({
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
exports.validateQuery = validateQuery;
//# sourceMappingURL=validation.js.map
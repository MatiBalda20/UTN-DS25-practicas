"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
exports.authorize = authorize;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware de autenticación: verificar JWT
function authenticate(req, res, next) {
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
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // 3. Agregar usuario al request
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };
        next();
    }
    catch (error) {
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
function authorize(...allowedRoles) {
    return (req, res, next) => {
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
//# sourceMappingURL=auth.middleware.js.map
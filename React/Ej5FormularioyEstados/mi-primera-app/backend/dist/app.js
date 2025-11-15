"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const books_1 = __importDefault(require("./routes/books"));
const users_1 = __importDefault(require("./routes/users"));
// Cargar variables de entorno
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Configuración de CORS
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true // Importante para enviar cookies/headers de auth
}));
// Middleware adicional para manejar preflight requests
app.options('*', (0, cors_1.default)());
// Middlewares
app.use(express_1.default.json());
// Servir archivos estáticos desde la carpeta de imágenes del frontend
app.use('/Img', express_1.default.static(path_1.default.join(__dirname, '../../public/Img')));
// Logger simple para desarrollo
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});
// Routes
app.use('/api/books', books_1.default);
app.use('/api/users', users_1.default);
// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});
// Ruta de prueba
app.get('/api/test', (req, res) => {
    res.json({
        message: 'API funcionando correctamente',
        jwt_configured: !!process.env.JWT_SECRET
    });
});
// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('❌ Error:', err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err : undefined
    });
});
// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 Books API: http://localhost:${PORT}/api/books`);
    console.log(`👥 Users API: http://localhost:${PORT}/api/users`);
    console.log(`🔐 JWT Secret configured: ${!!process.env.JWT_SECRET}`);
    console.log(`🌐 CORS configured for: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    console.log(`🖼️  Images served at: http://localhost:${PORT}/Img/`);
    console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const books_1 = __importDefault(require("./routes/books"));
const users_1 = __importDefault(require("./routes/users"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Configuración de CORS más permisiva para desarrollo
app.use((0, cors_1.default)({
    origin: '*', // Permitir todas las origins en desarrollo
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: false
}));
// Middleware adicional para manejar preflight requests
app.options('*', (0, cors_1.default)());
// Middlewares
app.use(express_1.default.json());
// Servir archivos estáticos desde la carpeta de imágenes del frontend
// Ajusta la ruta según donde tengas las imágenes
app.use('/Img', express_1.default.static(path_1.default.join(__dirname, '../../public/Img')));
// Routes
app.use('/api/books', books_1.default);
app.use('/api/users', users_1.default);
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});
// Ruta de prueba
app.get('/api/test', (req, res) => {
    res.json({ message: 'API funcionando correctamente' });
});
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 Books API: http://localhost:${PORT}/api/books`);
    console.log(`👥 Users API: http://localhost:${PORT}/api/users`);
    console.log(`🌐 CORS configured for all origins`);
    console.log(`🖼️  Images served at: http://localhost:${PORT}/Img/`);
    console.log(`🔗 Test URL: http://localhost:${PORT}/api/books/genre/fisica`);
});
exports.default = app;
//# sourceMappingURL=app.js.map
// src/app.ts
import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import bookRoutes from './routes/books';
import userRoutes from './routes/users';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true // Importante para enviar cookies/headers de auth
}));

// Middleware adicional para manejar preflight requests
app.options('*', cors());

// Middlewares
app.use(express.json());

// Servir archivos estáticos desde la carpeta de imágenes del frontend
app.use('/Img', express.static(path.join(__dirname, '../../public/Img')));

// Logger simple para desarrollo
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

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
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
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

export default app;
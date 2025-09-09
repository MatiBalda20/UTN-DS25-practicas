import express from 'express';
import cors from 'cors';
import path from 'path';
import bookRoutes from './routes/books';

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de CORS más permisiva para desarrollo
app.use(cors({
    origin: '*', // Permitir todas las origins en desarrollo
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: false
}));

// Middleware adicional para manejar preflight requests
app.options('*', cors());

// Middlewares
app.use(express.json());

// Servir archivos estáticos desde la carpeta de imágenes del frontend
// Ajusta la ruta según donde tengas las imágenes
app.use('/Img', express.static(path.join(__dirname, '../../public/Img')));

// Routes - solo libros
app.use('/api/books', bookRoutes);

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
    console.log(`🌐 CORS configured for all origins`);
    console.log(`🖼️  Images served at: http://localhost:${PORT}/Img/`);
    console.log(`🔗 Test URL: http://localhost:${PORT}/api/books/genre/fisica`);
});

export default app;
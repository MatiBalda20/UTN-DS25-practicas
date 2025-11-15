// src/routes/bookRoutes.ts
import express from 'express';
import { BookController } from '../controllers/bookController';
import { validateBody, validateParams, validateQuery } from '../middlewares/validation';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { 
    createBookSchema, 
    updateBookSchema, 
    bookParamsSchema, 
    bookQuerySchema,
    bookGenreParamsSchema
} from '../validations/schemas';

const router = express.Router();
const bookController = new BookController();

// ===== RUTAS PÚBLICAS (sin autenticación) =====

// Búsqueda
router.get('/search', 
    validateQuery(bookQuerySchema), 
    bookController.searchBooks.bind(bookController)
);

// Obtener géneros
router.get('/genres', 
    bookController.getGenres.bind(bookController)
);

// Filtrar por género
router.get('/genre/:genero', 
    validateParams(bookGenreParamsSchema), 
    bookController.getBooksByGenre.bind(bookController)
);

// Obtener libro por ID
router.get('/:id', 
    validateParams(bookParamsSchema), 
    bookController.getBookById.bind(bookController)
);

// Obtener todos los libros
router.get('/', 
    bookController.getAllBooks.bind(bookController)
);

// Crear libro (público)
router.post('/', 
    validateBody(createBookSchema), 
    bookController.createBook.bind(bookController)
);

// Actualizar libro (público)
router.put('/:id', 
    validateParams(bookParamsSchema),
    validateBody(updateBookSchema), 
    bookController.updateBook.bind(bookController)
);

// ===== RUTA PROTEGIDA - Solo ADMIN puede eliminar =====
router.delete('/:id',
    authenticate,                    // 1. Verificar que tenga token JWT válido
    authorize('ADMIN'),              // 2. Verificar que sea ADMIN
    validateParams(bookParamsSchema), // 3. Validar parámetros
    bookController.deleteBook.bind(bookController)
);

export default router;
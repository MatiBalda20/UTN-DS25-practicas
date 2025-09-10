// src/routes/books.ts
import express from 'express';
import { BookController } from '../controllers/bookController';
import { validateBody, validateParams, validateQuery } from '../middlewares/validation';
import { 
    createBookSchema, 
    updateBookSchema, 
    bookParamsSchema, 
    bookQuerySchema,
    bookGenreParamsSchema
} from '../validations/schemas';

const router = express.Router();
const bookController = new BookController();

// Rutas específicas primero (sin parámetros)
router.get('/search', 
    validateQuery(bookQuerySchema), 
    bookController.searchBooks.bind(bookController)
);

router.get('/genres', 
    bookController.getGenres.bind(bookController)
);

router.post('/seed', 
    bookController.seedBooks.bind(bookController)
);

// Rutas con parámetros después
router.get('/genre/:genero', 
    validateParams(bookGenreParamsSchema), 
    bookController.getBooksByGenre.bind(bookController)
);

router.get('/:id', 
    validateParams(bookParamsSchema), 
    bookController.getBookById.bind(bookController)
);

// Ruta general al final
router.get('/', 
    bookController.getAllBooks.bind(bookController)
);

// Rutas POST, PUT, DELETE con validación
router.post('/', 
    validateBody(createBookSchema), 
    bookController.createBook.bind(bookController)
);

router.put('/:id', 
    validateParams(bookParamsSchema),
    validateBody(updateBookSchema), 
    bookController.updateBook.bind(bookController)
);

router.delete('/:id', 
    validateParams(bookParamsSchema), 
    bookController.deleteBook.bind(bookController)
);

export default router;
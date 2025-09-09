import express from 'express';
import { BookController } from '../controllers/bookController';

const router = express.Router();
const bookController = new BookController();

// Rutas específicas primero (sin parámetros)
router.get('/search', bookController.searchBooks.bind(bookController));
router.get('/genres', bookController.getGenres.bind(bookController));

// Rutas con parámetros después
router.get('/genre/:genero', bookController.getBooksByGenre.bind(bookController));
router.get('/:id', bookController.getBookById.bind(bookController));

// Ruta general al final
router.get('/', bookController.getAllBooks.bind(bookController));

// Rutas POST, PUT, DELETE
router.post('/', bookController.createBook.bind(bookController));
router.put('/:id', bookController.updateBook.bind(bookController));
router.delete('/:id', bookController.deleteBook.bind(bookController));

export default router;
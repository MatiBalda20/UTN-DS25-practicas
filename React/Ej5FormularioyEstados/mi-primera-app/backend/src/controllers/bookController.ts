import { Request, Response } from 'express';
import { BookService } from '../services/bookService';

const bookService = new BookService();

export class BookController {
  // GET /api/books
    getAllBooks(req: Request, res: Response): void {
        try {
        const books = bookService.getAllBooks();
        res.json({
            success: true,
            data: books,
            count: books.length
        });
        } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los libros',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
        }
    }

    // GET /api/books/genre/:genero
    getBooksByGenre(req: Request, res: Response): void {
        try {
        const { genero } = req.params;
        const limit = parseInt(req.query.limit as string) || 12;

        const books = bookService.getBooksByGenre(genero, limit);
        
        res.json({
            success: true,
            data: books,
            count: books.length,
            genre: genero,
            limit
        });
        } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los libros por género',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
        }
    }

    // GET /api/books/:id
    getBookById(req: Request, res: Response): void {
        try {
        const { id } = req.params;
        const book = bookService.getBookById(id);

        if (!book) {
            res.status(404).json({
            success: false,
            message: 'Libro no encontrado'
            });
            return;
        }

        res.json({
            success: true,
            data: book
        });
        } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el libro',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
        }
    }

    // POST /api/books
    createBook(req: Request, res: Response): void {
        try {
        const bookData = req.body;

        // Validación básica
        if (!bookData.titulo || !bookData.autor || !bookData.genero) {
            res.status(400).json({
            success: false,
            message: 'Los campos título, autor y género son obligatorios'
            });
            return;
        }

        const newBook = bookService.createBook(bookData);
        
        res.status(201).json({
            success: true,
            data: newBook,
            message: 'Libro creado exitosamente'
        });
        } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el libro',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
        }
    }

    // PUT /api/books/:id
    updateBook(req: Request, res: Response): void {
        try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedBook = bookService.updateBook(id, updateData);

        if (!updatedBook) {
            res.status(404).json({
            success: false,
            message: 'Libro no encontrado'
            });
            return;
        }

        res.json({
            success: true,
            data: updatedBook,
            message: 'Libro actualizado exitosamente'
        });
        } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el libro',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
        }
    }

    // DELETE /api/books/:id
    deleteBook(req: Request, res: Response): void {
        try {
        const { id } = req.params;
        const deleted = bookService.deleteBook(id);

        if (!deleted) {
            res.status(404).json({
            success: false,
            message: 'Libro no encontrado'
            });
            return;
        }

        res.json({
            success: true,
            message: 'Libro eliminado exitosamente'
        });
        } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el libro',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
        }
    }

    // GET /api/books/search?q=query
    searchBooks(req: Request, res: Response): void {
        try {
        const query = req.query.q as string;

        if (!query) {
            res.status(400).json({
            success: false,
            message: 'El parámetro de búsqueda "q" es obligatorio'
            });
            return;
        }

        const books = bookService.searchBooks(query);
        
        res.json({
            success: true,
            data: books,
            count: books.length,
            query
        });
        } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar libros',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
        }
    }

    // GET /api/books/genres
    getGenres(req: Request, res: Response): void {
        try {
        const genres = bookService.getGenres();
        
        res.json({
            success: true,
            data: genres,
            count: genres.length
        });
        } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los géneros',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
        }
    }
    }
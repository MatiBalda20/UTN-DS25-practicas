// src/controllers/bookController.ts
import { Request, Response } from 'express';
import { BookService } from '../services/bookService';
import { BookResponse } from '../types';

const bookService = new BookService();

export class BookController {
    // GET /api/books
    async getAllBooks(req: Request, res: Response): Promise<void> {
        try {
            const books = await bookService.getAllBooks();
            const response: BookResponse = {
                success: true,
                data: books,
                count: books.length
            };
            res.json(response);
        } catch (error) {
            const response: BookResponse = {
                success: false,
                message: 'Error al obtener los libros',
                error: error instanceof Error ? error.message : 'Error desconocido'
            };
            res.status(500).json(response);
        }
    }

    // GET /api/books/genre/:genero - CON VALIDACIÓN ZOD
    async getBooksByGenre(req: Request, res: Response): Promise<void> {
        try {
            const { genero } = req.params; // Ya validado por Zod
            const limit = parseInt(req.query.limit as string) || 12;

            const books = await bookService.getBooksByGenre(genero, limit);
            
            const response: BookResponse = {
                success: true,
                data: books,
                count: books.length,
                genre: genero,
                limit
            };
            res.json(response);
        } catch (error) {
            const response: BookResponse = {
                success: false,
                message: 'Error al obtener los libros por género',
                error: error instanceof Error ? error.message : 'Error desconocido'
            };
            res.status(500).json(response);
        }
    }

    // GET /api/books/:id - CON VALIDACIÓN ZOD
    async getBookById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params; // Ya validado por Zod (UUID válido)
            const book = await bookService.getBookById(id);

            if (!book) {
                const response: BookResponse = {
                    success: false,
                    message: 'Libro no encontrado'
                };
                res.status(404).json(response);
                return;
            }

            const response: BookResponse = {
                success: true,
                data: book
            };
            res.json(response);
        } catch (error) {
            const response: BookResponse = {
                success: false,
                message: 'Error al obtener el libro',
                error: error instanceof Error ? error.message : 'Error desconocido'
            };
            res.status(500).json(response);
        }
    }

    // POST /api/books - CON VALIDACIÓN ZOD ✅
    async createBook(req: Request, res: Response): Promise<void> {
        try {
            // Los datos ya están validados y transformados por el middleware de Zod
            const bookData = req.body;

            console.log('Datos del libro validados por Zod:', bookData);

            const newBook = await bookService.createBook(bookData);
            
            const response: BookResponse = {
                success: true,
                data: newBook,
                message: 'Libro creado exitosamente'
            };
            res.status(201).json(response);
        } catch (error) {
            console.error('Error en createBook:', error);
            const response: BookResponse = {
                success: false,
                message: 'Error al crear el libro',
                error: error instanceof Error ? error.message : 'Error desconocido'
            };
            res.status(500).json(response);
        }
    }

    // PUT /api/books/:id - CON VALIDACIÓN ZOD ✅
    async updateBook(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params; // Ya validado por Zod (UUID válido)
            const updateData = req.body; // Ya validado por Zod

            console.log('Datos de actualización validados por Zod:', updateData);

            const updatedBook = await bookService.updateBook(id, updateData);

            if (!updatedBook) {
                const response: BookResponse = {
                    success: false,
                    message: 'Libro no encontrado'
                };
                res.status(404).json(response);
                return;
            }

            const response: BookResponse = {
                success: true,
                data: updatedBook,
                message: 'Libro actualizado exitosamente'
            };
            res.json(response);
        } catch (error) {
            const response: BookResponse = {
                success: false,
                message: 'Error al actualizar el libro',
                error: error instanceof Error ? error.message : 'Error desconocido'
            };
            res.status(500).json(response);
        }
    }

    // DELETE /api/books/:id - CON VALIDACIÓN ZOD
    async deleteBook(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params; // Ya validado por Zod (UUID válido)
            const deleted = await bookService.deleteBook(id);

            if (!deleted) {
                const response: BookResponse = {
                    success: false,
                    message: 'Libro no encontrado'
                };
                res.status(404).json(response);
                return;
            }

            const response: BookResponse = {
                success: true,
                message: 'Libro eliminado exitosamente'
            };
            res.json(response);
        } catch (error) {
            const response: BookResponse = {
                success: false,
                message: 'Error al eliminar el libro',
                error: error instanceof Error ? error.message : 'Error desconocido'
            };
            res.status(500).json(response);
        }
    }

    // GET /api/books/search?q=query - CON VALIDACIÓN ZOD
    async searchBooks(req: Request, res: Response): Promise<void> {
        try {
            const { q: query } = req.query; // Ya validado por Zod

            if (!query) {
                const response: BookResponse = {
                    success: false,
                    message: 'El parámetro de búsqueda "q" es obligatorio'
                };
                res.status(400).json(response);
                return;
            }

            const books = await bookService.searchBooks(query as string);
            
            const response: BookResponse = {
                success: true,
                data: books,
                count: books.length,
                query: query as string
            };
            res.json(response);
        } catch (error) {
            const response: BookResponse = {
                success: false,
                message: 'Error al buscar libros',
                error: error instanceof Error ? error.message : 'Error desconocido'
            };
            res.status(500).json(response);
        }
    }

    // GET /api/books/genres
    async getGenres(req: Request, res: Response): Promise<void> {
        try {
            const genres = await bookService.getGenres();
            
            res.json({
                success: true,
                data: genres,
                count: genres.length
            });
        } catch (error) {
            const response: BookResponse = {
                success: false,
                message: 'Error al obtener los géneros',
                error: error instanceof Error ? error.message : 'Error desconocido'
            };
            res.status(500).json(response);
        }
    }

    // POST /api/books/seed - Endpoint para poblar la BD con datos iniciales
    async seedBooks(req: Request, res: Response): Promise<void> {
        try {
            await bookService.seedBooks();
            const response: BookResponse = {
                success: true,
                message: 'Base de datos poblada con libros iniciales'
            };
            res.json(response);
        } catch (error) {
            const response: BookResponse = {
                success: false,
                message: 'Error al poblar la base de datos',
                error: error instanceof Error ? error.message : 'Error desconocido'
            };
            res.status(500).json(response);
        }
    }
}
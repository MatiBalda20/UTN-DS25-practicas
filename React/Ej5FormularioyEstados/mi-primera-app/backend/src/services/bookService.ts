import { prisma } from '../lib/prisma';
import { Book, CreateBookInput, UpdateBookInput } from '../types';

export class BookService {
    // Obtener todos los libros
    async getAllBooks(): Promise<Book[]> {
        return await prisma.book.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    // Obtener libros por género con límite
    async getBooksByGenre(genero: string, limit: number = 12): Promise<Book[]> {
        return await prisma.book.findMany({
            where: {
                genero: {
                    equals: genero.toLowerCase(),
                    mode: 'insensitive'
                }
            },
            take: limit,
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    // Obtener libro por ID
    async getBookById(id: string): Promise<Book | null> {
        return await prisma.book.findUnique({
            where: { id }
        });
    }

    // Crear nuevo libro
    async createBook(bookData: CreateBookInput): Promise<Book> {
        // Asegurar que la imagen tenga un valor por defecto si no se proporciona
        const dataToCreate = {
            ...bookData,
            imagen: bookData.imagen || '/Img/placeholder.jpg'
        };

        return await prisma.book.create({
            data: dataToCreate
        });
    }

    // Actualizar libro
    async updateBook(id: string, updateData: UpdateBookInput): Promise<Book | null> {
        try {
            return await prisma.book.update({
                where: { id },
                data: updateData
            });
        } catch (error) {
            // Si el libro no existe, Prisma lanzará un error
            return null;
        }
    }

    // Eliminar libro
    async deleteBook(id: string): Promise<boolean> {
        try {
            await prisma.book.delete({
                where: { id }
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    // Buscar libros por título o autor
    async searchBooks(query: string): Promise<Book[]> {
        return await prisma.book.findMany({
            where: {
                OR: [
                    {
                        titulo: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    },
                    {
                        autor: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    }
                ]
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    // Obtener géneros únicos
    async getGenres(): Promise<string[]> {
        const books = await prisma.book.findMany({
            select: {
                genero: true
            },
            distinct: ['genero']
        });
        
        return books.map(book => book.genero);
    }
}
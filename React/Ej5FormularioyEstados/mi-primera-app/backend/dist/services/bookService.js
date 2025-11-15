"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const prisma_1 = require("../lib/prisma");
class BookService {
    // Obtener todos los libros
    async getAllBooks() {
        return await prisma_1.prisma.book.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    // Obtener libros por género con límite
    async getBooksByGenre(genero, limit = 12) {
        return await prisma_1.prisma.book.findMany({
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
    async getBookById(id) {
        return await prisma_1.prisma.book.findUnique({
            where: { id }
        });
    }
    // Crear nuevo libro
    async createBook(bookData) {
        // Asegurar que la imagen tenga un valor por defecto si no se proporciona
        const dataToCreate = {
            ...bookData,
            imagen: bookData.imagen || '/Img/placeholder.jpg'
        };
        return await prisma_1.prisma.book.create({
            data: dataToCreate
        });
    }
    // Actualizar libro
    async updateBook(id, updateData) {
        try {
            return await prisma_1.prisma.book.update({
                where: { id },
                data: updateData
            });
        }
        catch (error) {
            // Si el libro no existe, Prisma lanzará un error
            return null;
        }
    }
    // Eliminar libro
    async deleteBook(id) {
        try {
            await prisma_1.prisma.book.delete({
                where: { id }
            });
            return true;
        }
        catch (error) {
            return false;
        }
    }
    // Buscar libros por título o autor
    async searchBooks(query) {
        return await prisma_1.prisma.book.findMany({
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
    async getGenres() {
        const books = await prisma_1.prisma.book.findMany({
            select: {
                genero: true
            },
            distinct: ['genero']
        });
        return books.map(book => book.genero);
    }
}
exports.BookService = BookService;
//# sourceMappingURL=bookService.js.map
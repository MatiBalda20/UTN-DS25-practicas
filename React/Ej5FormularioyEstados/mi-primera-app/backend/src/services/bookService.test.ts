import { BookService } from './bookService';
import { prisma } from '../lib/prisma';

// Mock completo de Prisma
jest.mock('../lib/prisma', () => ({
    prisma: {
        book: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        }
    }
}));

describe('BookService', () => {
    const service = new BookService();

    test('debe retornar lista de libros', async () => {
        const mockBooks = [{ id: '1', titulo: 'Libro A' }];
        (prisma.book.findMany as jest.Mock).mockResolvedValue(mockBooks);

        const result = await service.getAllBooks();
        expect(result).toEqual(mockBooks);
    });

    test('debe retornar null si no existe el libro', async () => {
        (prisma.book.findUnique as jest.Mock).mockResolvedValue(null);

        const book = await service.getBookById('abc123');
        expect(book).toBeNull();
    });

    test('debe crear un libro con imagen por defecto si no se envía', async () => {
        const newBook = { titulo: 'Nuevo', autor: 'Yo', genero: 'ficcion' };
        const mockCreated = { id: '1', ...newBook, imagen: '/Img/placeholder.jpg' };

        (prisma.book.create as jest.Mock).mockResolvedValue(mockCreated);

        const result = await service.createBook(newBook as any);

        expect(result.imagen).toBe('/Img/placeholder.jpg');
    });
});

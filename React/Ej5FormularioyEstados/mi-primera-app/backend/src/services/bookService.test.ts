import { BookService } from './bookService';
import { prisma } from '../lib/prisma';

// === Mock de Prisma ===
jest.mock('../../lib/prisma', () => ({
    prisma: {
        book: {
            findMany: jest.fn()
        }
    }
}));

describe('BookService - getAllBooks', () => {
    const service = new BookService();

    test('debe retornar lista de libros', async () => {
        const mockBooks = [
            { id: '1', titulo: 'Libro A' },
            { id: '2', titulo: 'Libro B' }
        ];

        (prisma.book.findMany as jest.Mock).mockResolvedValue(mockBooks);

        const result = await service.getAllBooks();

        expect(result).toEqual(mockBooks);
        expect(prisma.book.findMany).toHaveBeenCalled();
    });

    test('debe retornar null si no existe el libro', async () => {
    (prisma.book.findUnique as jest.Mock).mockResolvedValue(null);

    const book = await service.getBookById('abc123');

    expect(book).toBeNull();
    });

    test('debe crear un libro con imagen por defecto si no se envía', async () => {
    const newBook = { titulo: 'Nuevo', autor: 'Autor', genero: 'ficcion' };

    const mockCreated = { id: '1', ...newBook, imagen: '/Img/placeholder.jpg' };

    (prisma.book.create as jest.Mock).mockResolvedValue(mockCreated);

    const result = await service.createBook(newBook as any);

    expect(result.imagen).toBe('/Img/placeholder.jpg');
    expect(prisma.book.create).toHaveBeenCalled();
});

});



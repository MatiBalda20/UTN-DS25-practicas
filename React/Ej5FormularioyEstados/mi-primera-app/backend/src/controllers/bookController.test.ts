import { BookController } from './bookController';
import { BookService } from '../services/bookService';

jest.mock('../services/bookService'); // mock automático

describe('BookController - getAllBooks', () => {
    let controller: BookController;
    let req: any;
    let res: any;

    beforeEach(() => {
        controller = new BookController();

        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
    });

    test('debe retornar lista de libros', async () => {
        const mockBooks = [{ id: '1', titulo: 'Test' }];

        (BookService.prototype.getAllBooks as jest.Mock).mockResolvedValue(mockBooks);

        await controller.getAllBooks(req, res);

        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: mockBooks,
            count: 1
        });
    });

    test('debe retornar 404 si no encuentra el libro', async () => {
    (BookService.prototype.getBookById as jest.Mock).mockResolvedValue(null);

    req = { params: { id: 'no-existe' } };

    await controller.getBookById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Libro no encontrado'
    });
    });
});

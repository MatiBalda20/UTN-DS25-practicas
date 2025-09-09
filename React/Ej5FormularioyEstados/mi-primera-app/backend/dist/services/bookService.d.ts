import { Book, CreateBookInput, UpdateBookInput } from '../models/Book';
export declare class BookService {
    getAllBooks(): Book[];
    getBooksByGenre(genero: string, limit?: number): Book[];
    getBookById(id: string): Book | null;
    createBook(bookData: CreateBookInput): Book;
    updateBook(id: string, updateData: UpdateBookInput): Book | null;
    deleteBook(id: string): boolean;
    searchBooks(query: string): Book[];
    getGenres(): string[];
}
//# sourceMappingURL=bookService.d.ts.map
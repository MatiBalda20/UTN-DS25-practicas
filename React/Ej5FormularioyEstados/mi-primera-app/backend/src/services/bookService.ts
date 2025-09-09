import { Book, CreateBookInput, UpdateBookInput } from '../models/Book';

// Función simple para generar IDs únicos
const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    // Mock database - datos de libros con tus datos reales
    const books: Book[] = [
    // FANTASÍA
    {
        id: generateId(),
        titulo: "Harry Potter y la piedra filosofal",
        autor: "J.K Rowling",
        img: "/Img/harry1.jpg",
        genero: "fantasia",
    },
    {
        id: generateId(),
        titulo: "Harry Potter y la cámara secreta",
        autor: "J.K Rowling",
        img: "/Img/harry2.jpg",
        genero: "fantasia",
    },
    {
        id: generateId(),
        titulo: "Harry Potter y el prisionero de Azkaban",
        autor: "J.K Rowling",
        img: "/Img/harry3.jpg",
        genero: "fantasia",
    },
    {
        id: generateId(),
        titulo: "Harry Potter y el cáliz de fuego",
        autor: "J.K Rowling",
        img: "/Img/harry4.jpg",
        genero: "fantasia",
    },
    {
        id: generateId(),
        titulo: "Harry Potter y la Orden del Fénix",
        autor: "J.K Rowling",
        img: "/Img/harry5.jpg",
        genero: "fantasia",
    },
    {
        id: generateId(),
        titulo: "Harry Potter y el misterio del príncipe",
        autor: "J.K Rowling",
        img: "/Img/harry6.jpg",
        genero: "fantasia",
    },

    // FÍSICA
    {
        id: generateId(),
        titulo: "El Bosón de Higgs",
        autor: "Javier Santaolalla",
        img: "/Img/boson .jpg",
        genero: "fisica",
    },
    {
        id: generateId(),
        titulo: "Física, conceptos y aplicaciones",
        autor: "Paul E. Tippens",
        img: "/Img/fisica1.jpg",
        genero: "fisica",
    },
    {
        id: generateId(),
        titulo: "El libro de la física",
        autor: "Clifford A. Pickover",
        img: "/Img/fisica2.jpg",
        genero: "fisica",
    },
    {
        id: generateId(),
        titulo: "Introducción a la física",
        autor: "Alberto Rubio Ponce",
        img: "/Img/fisica3.jpg",
        genero: "fisica",
    },
    {
        id: generateId(),
        titulo: "Física volumen 1",
        autor: "Thomas A. Moore",
        img: "/Img/fisica4.jpg",
        genero: "fisica",
    },
    {
        id: generateId(),
        titulo: "Física cuántica",
        autor: "Carlos Sánchez del Río",
        img: "/Img/fisica5.jpg",
        genero: "fisica",
    },

    // CIENCIA FICCIÓN
    {
        id: generateId(),
        titulo: "Dune 1",
        autor: "Frank Herbert",
        img: "/Img/dune 1.jpg",
        genero: "ciencia-ficcion",
    },
    {
        id: generateId(),
        titulo: "El mesías de Dune",
        autor: "Frank Herbert",
        img: "/Img/dune2.jpg",
        genero: "ciencia-ficcion",
    },
    {
        id: generateId(),
        titulo: "Hijos de Dune",
        autor: "Frank Herbert",
        img: "/Img/dune3.jpg",
        genero: "ciencia-ficcion",
    },
    {
        id: generateId(),
        titulo: "Dios emperador de Dune",
        autor: "Frank Herbert",
        img: "/Img/dune4.jpg",
        genero: "ciencia-ficcion",
    },
    {
        id: generateId(),
        titulo: "Herejes de Dune",
        autor: "Frank Herbert",
        img: "/Img/dune5.jpg",
        genero: "ciencia-ficcion",
    },
    {
        id: generateId(),
        titulo: "Casa Capitular Dune",
        autor: "Frank Herbert",
        img: "/Img/dune6.jpg",
        genero: "ciencia-ficcion",
    },

    // POLICIALES
    {
        id: generateId(),
        titulo: "Sherlock Holmes: Estudio en escarlata",
        autor: "Sir Arthur Conan Doyle",
        img: "/Img/holmes 1.jpg",
        genero: "policiales",
    },
    {
        id: generateId(),
        titulo: "Sherlock Holmes: El signo de los cuatro",
        autor: "Sir Arthur Conan Doyle",
        img: "/Img/holmes2.jpg",
        genero: "policiales",
    },
    {
        id: generateId(),
        titulo: "Sherlock Holmes: El sabueso de Baskerville",
        autor: "Sir Arthur Conan Doyle",
        img: "/Img/holmes3.jpg",
        genero: "policiales",
    },
    {
        id: generateId(),
        titulo: "Sherlock Holmes: El valle del terror",
        autor: "Sir Arthur Conan Doyle",
        img: "/Img/holmes4.jpg",
        genero: "policiales",
    },
    {
        id: generateId(),
        titulo: "El asedio",
        autor: "Arturo Pérez-Reverte",
        img: "/Img/holmes5.jpg",
        genero: "policiales",
    },
    {
        id: generateId(),
        titulo: "Cuentos policiales",
        autor: "Edgar Allan Poe",
        img: "/Img/holmes6.jpg",
        genero: "policiales",
    }
    ];

    export class BookService {
    // Obtener todos los libros
    getAllBooks(): Book[] {
        return books;
    }

    // Obtener libros por género con límite
    getBooksByGenre(genero: string, limit: number = 12): Book[] {
        const filteredBooks = books.filter(book => 
        book.genero.toLowerCase() === genero.toLowerCase()
        );
        return filteredBooks.slice(0, limit);
    }

    // Obtener libro por ID
    getBookById(id: string): Book | null {
        return books.find(book => book.id === id) || null;
    }

    // Crear nuevo libro
    createBook(bookData: CreateBookInput): Book {
        const newBook: Book = {
        id: generateId(),
        ...bookData
        };
        
        books.push(newBook);
        return newBook;
    }

    // Actualizar libro
    updateBook(id: string, updateData: UpdateBookInput): Book | null {
        const bookIndex = books.findIndex(book => book.id === id);
        
        if (bookIndex === -1) {
        return null;
        }

        books[bookIndex] = {
        ...books[bookIndex],
        ...updateData
        };

        return books[bookIndex];
    }

    // Eliminar libro
    deleteBook(id: string): boolean {
        const bookIndex = books.findIndex(book => book.id === id);
        
        if (bookIndex === -1) {
        return false;
        }

        books.splice(bookIndex, 1);
        return true;
    }

    // Buscar libros por título o autor
    searchBooks(query: string): Book[] {
        const searchTerm = query.toLowerCase();
        return books.filter(book => 
        book.titulo.toLowerCase().includes(searchTerm) ||
        book.autor.toLowerCase().includes(searchTerm)
        );
    }

    // Obtener géneros únicos
    getGenres(): string[] {
        const genres = books.map(book => book.genero);
        return Array.from(new Set(genres));
    }
    }
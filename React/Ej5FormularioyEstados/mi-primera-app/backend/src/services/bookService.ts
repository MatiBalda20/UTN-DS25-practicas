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

    // Seed inicial de datos (opcional - para poblar la BD)
    async seedBooks(): Promise<void> {
        const booksToCreate = [
            // FANTASÍA
            {
                titulo: "Harry Potter y la piedra filosofal",
                autor: "J.K Rowling",
                imagen: "/Img/harry1.jpg",
                genero: "fantasia",
            },
            {
                titulo: "Harry Potter y la cámara secreta",
                autor: "J.K Rowling",
                imagen: "/Img/harry2.jpg",
                genero: "fantasia",
            },
            {
                titulo: "Harry Potter y el prisionero de Azkaban",
                autor: "J.K Rowling",
                imagen: "/Img/harry3.jpg",
                genero: "fantasia",
            },
            {
                titulo: "Harry Potter y el cáliz de fuego",
                autor: "J.K Rowling",
                imagen: "/Img/harry4.jpg",
                genero: "fantasia",
            },
            {
                titulo: "Harry Potter y la Orden del Fénix",
                autor: "J.K Rowling",
                imagen: "/Img/harry5.jpg",
                genero: "fantasia",
            },
            {
                titulo: "Harry Potter y el misterio del príncipe",
                autor: "J.K Rowling",
                imagen: "/Img/harry6.jpg",
                genero: "fantasia",
            },
            // FÍSICA
            {
                titulo: "El Bosón de Higgs",
                autor: "Javier Santaolalla",
                imagen: "/Img/boson .jpg",
                genero: "fisica",
            },
            {
                titulo: "Física, conceptos y aplicaciones",
                autor: "Paul E. Tippens",
                imagen: "/Img/fisica1.jpg",
                genero: "fisica",
            },
            {
                titulo: "El libro de la física",
                autor: "Clifford A. Pickover",
                imagen: "/Img/fisica2.jpg",
                genero: "fisica",
            },
            {
                titulo: "Introducción a la física",
                autor: "Alberto Rubio Ponce",
                imagen: "/Img/fisica3.jpg",
                genero: "fisica",
            },
            {
                titulo: "Física volumen 1",
                autor: "Thomas A. Moore",
                imagen: "/Img/fisica4.jpg",
                genero: "fisica",
            },
            {
                titulo: "Física cuántica",
                autor: "Carlos Sánchez del Río",
                imagen: "/Img/fisica5.jpg",
                genero: "fisica",
            },
            // CIENCIA FICCIÓN
            {
                titulo: "Dune 1",
                autor: "Frank Herbert",
                imagen: "/Img/dune 1.jpg",
                genero: "ciencia-ficcion",
            },
            {
                titulo: "El mesías de Dune",
                autor: "Frank Herbert",
                imagen: "/Img/dune2.jpg",
                genero: "ciencia-ficcion",
            },
            {
                titulo: "Hijos de Dune",
                autor: "Frank Herbert",
                imagen: "/Img/dune3.jpg",
                genero: "ciencia-ficcion",
            },
            {
                titulo: "Dios emperador de Dune",
                autor: "Frank Herbert",
                imagen: "/Img/dune4.jpg",
                genero: "ciencia-ficcion",
            },
            {
                titulo: "Herejes de Dune",
                autor: "Frank Herbert",
                imagen: "/Img/dune5.jpg",
                genero: "ciencia-ficcion",
            },
            {
                titulo: "Casa Capitular Dune",
                autor: "Frank Herbert",
                imagen: "/Img/dune6.jpg",
                genero: "ciencia-ficcion",
            },
            // POLICIALES
            {
                titulo: "Sherlock Holmes: Estudio en escarlata",
                autor: "Sir Arthur Conan Doyle",
                imagen: "/Img/holmes 1.jpg",
                genero: "policiales",
            },
            {
                titulo: "Sherlock Holmes: El signo de los cuatro",
                autor: "Sir Arthur Conan Doyle",
                imagen: "/Img/holmes2.jpg",
                genero: "policiales",
            },
            {
                titulo: "Sherlock Holmes: El sabueso de Baskerville",
                autor: "Sir Arthur Conan Doyle",
                imagen: "/Img/holmes3.jpg",
                genero: "policiales",
            },
            {
                titulo: "Sherlock Holmes: El valle del terror",
                autor: "Sir Arthur Conan Doyle",
                imagen: "/Img/holmes4.jpg",
                genero: "policiales",
            },
            {
                titulo: "El asedio",
                autor: "Arturo Pérez-Reverte",
                imagen: "/Img/holmes5.jpg",
                genero: "policiales",
            },
            {
                titulo: "Cuentos policiales",
                autor: "Edgar Allan Poe",
                imagen: "/Img/holmes6.jpg",
                genero: "policiales",
            }
        ];

        for (const book of booksToCreate) {
            await prisma.book.create({
                data: book
            });
        }
    }
}
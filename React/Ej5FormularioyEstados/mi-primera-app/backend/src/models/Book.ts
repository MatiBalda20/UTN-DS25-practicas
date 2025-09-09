export interface Book {
    id: string;
    titulo: string;
    autor: string;
    img: string;
    genero: string;
    isbn?: string;
    descripcion?: string;
    añoPublicacion?: number;
}

export interface CreateBookInput {
    titulo: string;
    autor: string;
    img: string;
    genero: string;
    isbn?: string;
    descripcion?: string;
    añoPublicacion?: number;
}

export interface UpdateBookInput {
    titulo?: string;
    autor?: string;
    img?: string;
    genero?: string;
    isbn?: string;
    descripcion?: string;
    añoPublicacion?: number;
}
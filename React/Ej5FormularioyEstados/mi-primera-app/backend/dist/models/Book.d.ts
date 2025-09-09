export interface Book {
    id: string;
    titulo: string;
    autor: string;
    img: string;
    genero: string;
    isbn?: string;
    descripcion?: string;
    añoPublicacion?: number;
    stock: number;
    precio?: number;
}
export interface CreateBookInput {
    titulo: string;
    autor: string;
    img: string;
    genero: string;
    isbn?: string;
    descripcion?: string;
    añoPublicacion?: number;
    stock: number;
    precio?: number;
}
export interface UpdateBookInput {
    titulo?: string;
    autor?: string;
    img?: string;
    genero?: string;
    isbn?: string;
    descripcion?: string;
    añoPublicacion?: number;
    stock?: number;
    precio?: number;
}
//# sourceMappingURL=Book.d.ts.map
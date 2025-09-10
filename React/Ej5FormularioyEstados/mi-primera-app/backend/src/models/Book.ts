// Book interfaces
export interface Book {
    id: string;
    titulo: string;
    autor: string;
    imagen: string;
    genero: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateBookInput {
    titulo: string;
    autor: string;
    imagen: string;
    genero: string;
}

export interface UpdateBookInput {
    titulo?: string;
    autor?: string;
    imagen?: string;
    genero?: string;
}

// Response types para Book
export interface BookResponse {
    success: boolean;
    data?: Book | Book[];
    message?: string;
    error?: string;
    count?: number;
    genre?: string;
    limit?: number;
    query?: string;
}
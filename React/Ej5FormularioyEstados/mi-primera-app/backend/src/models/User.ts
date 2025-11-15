// User interfaces
export interface User {
    id: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    role: String;
}

export interface CreateUserInput {
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
    email: string;
    password: string;
}

export interface UpdateUserInput {
    nombre?: string;
    apellido?: string;
    fechaNacimiento?: Date;
    email?: string;
    password?: string;
}

// Response types para User
export interface UserResponse {
    success: boolean;
    data?: Omit<User, 'password'> | Omit<User, 'password'>[];
    message?: string;
    error?: string;
    count?: number;
}

// Login types
export interface LoginInput {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    data?: {
        user: Omit<User, 'password'>;
        token: string;
    };
    message?: string;
    error?: string;
}

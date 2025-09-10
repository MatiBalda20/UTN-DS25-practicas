// src/validations/schemas.ts
import { z } from 'zod';

// Géneros válidos para libros
const validGenres = [
    'fantasia',
    'fisica', 
    'ciencia-ficcion',
    'policiales',
    'romance',
    'terror',
    'historia',
    'biografia'
] as const;

// Esquemas para Book
export const createBookSchema = z.object({
    titulo: z.string()
        .min(1, 'El título es obligatorio')
        .min(2, 'El título debe tener al menos 2 caracteres')
        .max(200, 'El título no puede exceder 200 caracteres')
        .trim(),
    autor: z.string()
        .min(1, 'El autor es obligatorio')
        .min(2, 'El nombre del autor debe tener al menos 2 caracteres')
        .max(100, 'El nombre del autor no puede exceder 100 caracteres')
        .trim(),
    genero: z.enum(validGenres),
    imagen: z.string()
        .url('La imagen debe ser una URL válida')
        .min(1, 'La imagen es obligatoria')
        .refine((url) => {
            // Validar que la URL termine con una extensión de imagen
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
            const urlLower = url.toLowerCase();
            return imageExtensions.some(ext => urlLower.includes(ext)) || 
                    urlLower.includes('placeholder') || 
                    urlLower.includes('picsum') ||
                    urlLower.includes('unsplash');
        }, 'La URL debe apuntar a una imagen válida (jpg, png, gif, webp, etc.)')
});

export const updateBookSchema = createBookSchema.partial();

export const bookParamsSchema = z.object({
    id: z.string().uuid('ID de libro inválido')
});

export const bookGenreParamsSchema = z.object({
    genero: z.enum(validGenres)
});

export const bookQuerySchema = z.object({
    q: z.string().min(1, 'El término de búsqueda es obligatorio').optional(),
    limit: z.string()
        .optional()
        .transform((val) => val ? parseInt(val) : 12)
        .pipe(z.number().min(1).max(50))
});

// Esquemas para User
export const createUserSchema = z.object({
    nombre: z.string()
        .min(1, 'El nombre es obligatorio')
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no puede exceder 50 caracteres')
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios')
        .trim(),
    apellido: z.string()
        .min(1, 'El apellido es obligatorio')
        .min(2, 'El apellido debe tener al menos 2 caracteres')
        .max(50, 'El apellido no puede exceder 50 caracteres')
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras y espacios')
        .trim(),
    email: z.string()
        .min(1, 'El email es obligatorio')
        .email('Formato de email inválido')
        .max(100, 'El email no puede exceder 100 caracteres')
        .toLowerCase(),
    password: z.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .max(100, 'La contraseña no puede exceder 100 caracteres')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'La contraseña debe tener al menos: 1 minúscula, 1 mayúscula y 1 número'),
    fechaNacimiento: z.string()
        .or(z.date())
        .transform((val) => {
            if (typeof val === 'string') {
                const date = new Date(val);
                if (isNaN(date.getTime())) {
                    throw new Error('Fecha inválida');
                }
                return date;
            }
            return val;
        })
        .refine((date) => {
            const today = new Date();
            const age = today.getFullYear() - date.getFullYear();
            return age >= 13 && age <= 120;
        }, 'Debes tener entre 13 y 120 años')
});

export const updateUserSchema = createUserSchema.partial();

export const userParamsSchema = z.object({
    id: z.string().uuid('ID de usuario inválido')
});

export const loginSchema = z.object({
    email: z.string()
        .min(1, 'El email es obligatorio')
        .email('Formato de email inválido')
        .toLowerCase(),
    password: z.string()
        .min(1, 'La contraseña es obligatoria')
});

// Tipos derivados de los esquemas
export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
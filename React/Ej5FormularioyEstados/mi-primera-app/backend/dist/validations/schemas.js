"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.userParamsSchema = exports.updateUserSchema = exports.createUserSchema = exports.bookQuerySchema = exports.bookGenreParamsSchema = exports.bookParamsSchema = exports.updateBookSchema = exports.createBookSchema = void 0;
// src/validations/schemas.ts
const zod_1 = require("zod");
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
];
// Esquemas para Book
exports.createBookSchema = zod_1.z.object({
    titulo: zod_1.z.string()
        .min(1, 'El título es obligatorio')
        .min(2, 'El título debe tener al menos 2 caracteres')
        .max(200, 'El título no puede exceder 200 caracteres')
        .trim(),
    autor: zod_1.z.string()
        .min(1, 'El autor es obligatorio')
        .min(2, 'El nombre del autor debe tener al menos 2 caracteres')
        .max(100, 'El nombre del autor no puede exceder 100 caracteres')
        .trim(),
    genero: zod_1.z.enum(validGenres),
    imagen: zod_1.z.string()
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
exports.updateBookSchema = exports.createBookSchema.partial();
exports.bookParamsSchema = zod_1.z.object({
    id: zod_1.z.string().uuid('ID de libro inválido')
});
exports.bookGenreParamsSchema = zod_1.z.object({
    genero: zod_1.z.enum(validGenres)
});
exports.bookQuerySchema = zod_1.z.object({
    q: zod_1.z.string().min(1, 'El término de búsqueda es obligatorio').optional(),
    limit: zod_1.z.string()
        .optional()
        .transform((val) => val ? parseInt(val) : 12)
        .pipe(zod_1.z.number().min(1).max(50))
});
// Esquemas para User
exports.createUserSchema = zod_1.z.object({
    nombre: zod_1.z.string()
        .min(1, 'El nombre es obligatorio')
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no puede exceder 50 caracteres')
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios')
        .trim(),
    apellido: zod_1.z.string()
        .min(1, 'El apellido es obligatorio')
        .min(2, 'El apellido debe tener al menos 2 caracteres')
        .max(50, 'El apellido no puede exceder 50 caracteres')
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras y espacios')
        .trim(),
    email: zod_1.z.string()
        .min(1, 'El email es obligatorio')
        .email('Formato de email inválido')
        .max(100, 'El email no puede exceder 100 caracteres')
        .toLowerCase(),
    password: zod_1.z.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .max(100, 'La contraseña no puede exceder 100 caracteres')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'La contraseña debe tener al menos: 1 minúscula, 1 mayúscula y 1 número'),
    fechaNacimiento: zod_1.z.string()
        .or(zod_1.z.date())
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
exports.updateUserSchema = exports.createUserSchema.partial();
exports.userParamsSchema = zod_1.z.object({
    id: zod_1.z.string().uuid('ID de usuario inválido')
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string()
        .min(1, 'El email es obligatorio')
        .email('Formato de email inválido')
        .toLowerCase(),
    password: zod_1.z.string()
        .min(1, 'La contraseña es obligatoria')
});
//# sourceMappingURL=schemas.js.map
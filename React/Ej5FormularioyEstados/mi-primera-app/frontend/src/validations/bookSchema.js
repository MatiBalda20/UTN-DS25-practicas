import * as yup from 'yup';

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

export const bookSchema = yup.object().shape({
    titulo: yup.string()
        .required('El título es obligatorio')
        .min(2, 'El título debe tener al menos 2 caracteres')
        .max(200, 'El título no puede exceder 200 caracteres'),
    autor: yup.string()
        .required('El autor es obligatorio')
        .min(2, 'El nombre del autor debe tener al menos 2 caracteres')
        .max(100, 'El nombre del autor no puede exceder 100 caracteres'),
    genero: yup.string()
        .oneOf(validGenres, 'Debes seleccionar un género válido') // Valida contra la lista
        .required('Debes seleccionar un género'), // 'select' requiere un .required()
    imagen: yup.string()
        .url('La imagen debe ser una URL válida') // Valida que sea una URL
        .required('La URL de la imagen es obligatoria')
});
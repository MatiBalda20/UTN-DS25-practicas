import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    nombre: yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'), 
    
    apellido: yup.string()
    .required('El apellido es obligatorio')
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres'), 
    
    fechaNacimiento: yup.date()
    .required('La fecha de nacimiento es obligatoria')
    .max(new Date(), 'La fecha no puede ser futura')
    .test('age', 'Debes tener entre 13 y 120 años', (value) => {
        if (!value) return false;
        const today = new Date();
        const age = today.getFullYear() - value.getFullYear();
        return age >= 13 && age <= 120;
    }), 
    
    email: yup.string()
    .required('El email es requerido')
    .email('Debe ser un email válido'),
    
    password: yup.string()
    .required('La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres') 
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Debe tener mayúscula, minúscula y número'), 

    role: yup.string()
    .oneOf(['USER', 'ADMIN'], 'Rol inválido')
    .required('El rol es requerido')
});
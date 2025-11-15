import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useForm } from 'react-hook-form'; 
import { yupResolver } from '@hookform/resolvers/yup'; 

import { registerSchema } from '../validations/registerSchema'; 

const API_BASE_URL = 'http://localhost:3001/api';

const Registro = () => {
    const navigate = useNavigate();
    
    const [serverError, setServerError] = useState('');
    const [success, setSuccess] = useState(false);

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting } 
    } = useForm({
        resolver: yupResolver(registerSchema), 
        defaultValues: { 
            nombre: '',
            apellido: '',
            fechaNacimiento: '',
            email: '',
            password: '',
            role: 'USER'
        }
    });

    const onSubmit = async (formData) => {
        setServerError('');
        setSuccess(false);
        

        try {
            const response = await fetch(`${API_BASE_URL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData) 
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setServerError(data.message || 'Error al registrar el usuario');
            }
        } catch (err) {
            setServerError('Error de conexión con el servidor');
            console.error('Error:', err);
        }
    };

    
    const getErrorClass = (field) => {
        return errors[field] ? 'border-red-500' : 'border-gray-300';
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#fcfcfc] p-6">
            
            
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold text-center text-black mb-6">Registro</h2>
                
                {/* --- CAMPO NOMBRE --- */}
                <div>
                    <label htmlFor="nombre" className="block font-semibold">Nombre:</label>
                    <input 
                        type="text" 
                        id="nombre"
                        {...register("nombre")} 
                        disabled={isSubmitting} 
                        className={`w-full border rounded px-3 py-2 ${getErrorClass('nombre')}`}
                    />
                    {/*Mostrar error de validación para este campo */}
                    {errors.nombre && (
                        <span className="text-red-600 text-sm mt-1">{errors.nombre.message}</span> 
                    )}
                </div>
                
                {/* --- CAMPO APELLIDO --- */}
                <div>
                    <label htmlFor="apellido" className="block font-semibold">Apellido:</label>
                    <input 
                        type="text" 
                        id="apellido" 
                        {...register("apellido")}
                        disabled={isSubmitting}
                        className={`w-full border rounded px-3 py-2 ${getErrorClass('apellido')}`}
                    />
                    {errors.apellido && (
                        <span className="text-red-600 text-sm mt-1">{errors.apellido.message}</span>
                    )}
                </div>
                
                {/* --- CAMPO FECHA NACIMIENTO --- */}
                <div>
                    <label htmlFor="fechaNacimiento" className="block font-semibold">Fecha de Nacimiento:</label>
                    <input 
                        type="date" 
                        id="fechaNacimiento" 
                        {...register("fechaNacimiento")}
                        disabled={isSubmitting}
                        className={`w-full border rounded px-3 py-2 ${getErrorClass('fechaNacimiento')}`}
                    />
                    {errors.fechaNacimiento && (
                        <span className="text-red-600 text-sm mt-1">{errors.fechaNacimiento.message}</span>
                    )}
                </div>
                
                {/* --- CAMPO EMAIL --- */}
                <div>
                    <label htmlFor="email" className="block font-semibold">Correo Electrónico:</label>
                    <input 
                        type="email" 
                        id="email" 
                        {...register("email")}
                        disabled={isSubmitting}
                        className={`w-full border rounded px-3 py-2 ${getErrorClass('email')}`} 
                    />
                    {errors.email && (
                        <span className="text-red-600 text-sm mt-1">{errors.email.message}</span>
                    )}
                </div>
                
                {/* --- CAMPO PASSWORD --- */}
                <div>
                    <label htmlFor="password" className="block font-semibold">Contraseña:</label>
                    <input 
                        type="password" 
                        id="password" 
                        {...register("password")}
                        disabled={isSubmitting}
                        className={`w-full border rounded px-3 py-2 ${getErrorClass('password')}`}
                    />
                    {errors.password ? (
                        <span className="text-red-600 text-sm mt-1">{errors.password.message}</span>
                    ) : (
                        <small className="text-gray-500">
                            Mínimo 6 caracteres (1 mayúscula, 1 minúscula, 1 número)
                        </small>
                    )}
                </div>
                
                {/* --- CAMPO ROL --- */}
                <div>
                    <label htmlFor="role" className="block font-semibold">Tipo de Cuenta:</label>
                    <select 
                        id="role" 
                        {...register("role")}
                        disabled={isSubmitting}
                        className={`w-full border rounded px-3 py-2 ${getErrorClass('role')}`}
                    >
                        <option value="USER">Usuario Regular</option>
                        <option value="ADMIN">Administrador</option>
                    </select>
                    {errors.role && (
                        <span className="text-red-600 text-sm mt-1">{errors.role.message}</span>
                    )}
                </div>
                
                {/* --- Errores del Servidor --- */}
                {serverError && (
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center">
                        ❌ {serverError}
                    </div>
                )}
                
                {success && (
                    <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded text-center">
                        ✅ ¡Registro exitoso! Redirigiendo al login...
                    </div>
                )}
                
                <div className="text-center mt-6">
                    <input
                        type="submit"
                        value={isSubmitting ? "Registrando..." : "Registrarse"}
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50 cursor-pointer w-full"
                        disabled={isSubmitting}
                    />
                </div>

                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Inicia sesión aquí
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Registro;
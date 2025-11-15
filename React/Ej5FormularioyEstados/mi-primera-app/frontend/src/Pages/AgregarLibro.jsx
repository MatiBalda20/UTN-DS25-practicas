import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// React Hook Form + Yup
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { bookSchema } from '../validations/bookSchema';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function AgregarLibro() {
    const navigate = useNavigate();

    // Estados para respuesta del servidor
    const [exito, setExito] = useState(false);
    const [serverError, setServerError] = useState('');

    // Inicializar RHF
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(bookSchema),
        defaultValues: {
            titulo: '',
            autor: '',
            genero: '',
            imagen: ''
        }
    });

    const imagenUrl = watch('imagen');

    const onSubmit = async (data) => {
        setServerError('');
        setExito(false);

        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`${API_BASE_URL}/books`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Error del servidor');
            }

            if (responseData.success) {
                setExito(true);
                reset();
                setTimeout(() => navigate('/'), 2000);
            } else {
                setServerError(responseData.message || 'Error al agregar el libro');
            }
        } catch (err) {
            setServerError(err.message || 'Error de conexión con el servidor');
            console.error(err);
        }
    };

    const getErrorClass = (field) =>
        errors[field] ? 'border-red-500' : 'border-gray-300';

    return (
        <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Agregar nuevo libro
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* TÍTULO */}
                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Título</label>
                    <input
                        type="text"
                        {...register("titulo")}
                        className={`w-full p-2 border rounded ${getErrorClass('titulo')}`}
                        disabled={isSubmitting}
                    />
                    {errors.titulo && (
                        <span className="text-red-600 text-sm mt-1">
                            {errors.titulo.message}
                        </span>
                    )}
                </div>

                {/* AUTOR */}
                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Autor</label>
                    <input
                        type="text"
                        {...register("autor")}
                        className={`w-full p-2 border rounded ${getErrorClass('autor')}`}
                        disabled={isSubmitting}
                    />
                    {errors.autor && (
                        <span className="text-red-600 text-sm mt-1">
                            {errors.autor.message}
                        </span>
                    )}
                </div>

                {/* GÉNERO */}
                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Género</label>
                    <select
                        {...register("genero")}
                        className={`w-full p-2 border rounded ${getErrorClass('genero')}`}
                        disabled={isSubmitting}
                    >
                        <option value="">-- Seleccionar --</option>
                        <option value="fantasia">Fantasía</option>
                        <option value="fisica">Física</option>
                        <option value="ciencia-ficcion">Ciencia Ficción</option>
                        <option value="policiales">Policiales</option>
                    </select>
                    {errors.genero && (
                        <span className="text-red-600 text-sm mt-1">
                            {errors.genero.message}
                        </span>
                    )}
                </div>

                {/* IMAGEN */}
                <div>
                    <label className="block mb-1 font-semibold text-gray-700">
                        URL de la Imagen
                    </label>
                    <input
                        type="url"
                        {...register("imagen")}
                        placeholder="https://ejemplo.com/imagen.jpg"
                        className={`w-full p-2 border rounded ${getErrorClass('imagen')}`}
                        disabled={isSubmitting}
                    />
                    {errors.imagen ? (
                        <span className="text-red-600 text-sm mt-1">
                            {errors.imagen.message}
                        </span>
                    ) : (
                        <small className="text-gray-500 text-sm">
                            Ingresa la URL de la imagen de la portada del libro
                        </small>
                    )}
                </div>

                {/* VISTA PREVIA */}
                {imagenUrl && !errors.imagen && (
                    <div className="mt-4">
                        <label className="block mb-1 font-semibold text-gray-700">
                            Vista previa:
                        </label>
                        <img
                            src={imagenUrl}
                            alt="Vista previa"
                            className="w-32 h-48 object-cover border border-gray-300 rounded shadow-sm"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Agregando...' : 'Agregar libro'}
                </button>
            </form>

            {/* MENSAJES */}
            {serverError && (
                <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center">
                    ❌ {serverError}
                </div>
            )}

            {exito && (
                <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded text-center">
                    ✅ ¡Libro agregado con éxito! Redirigiendo...
                </div>
            )}
        </div>
    );
}

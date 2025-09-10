import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3001/api';

const Registro = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        email: '',
        password: '',
        tema: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true);

        // Remover el campo tema antes de enviar, ya que no está en el modelo User
        const { tema, ...userData } = formData;

        try {
            const response = await fetch(`${API_BASE_URL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                // Limpiar el formulario
                setFormData({
                    nombre: '',
                    apellido: '',
                    fechaNacimiento: '',
                    email: '',
                    password: '',
                    tema: ''
                });
                // Redirigir después de 2 segundos
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setError(data.message || 'Error al registrar el usuario');
            }
        } catch (err) {
            setError('Error de conexión con el servidor');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#fcfcfc] p-6">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold text-center text-black mb-6">Registro</h2>
                
                <div>
                    <label htmlFor="nombre" className="block font-semibold">Nombre:</label>
                    <input 
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        value={formData.nombre}
                        onChange={handleChange}
                        required 
                        disabled={loading}
                        className="w-full border border-gray-300 rounded px-3 py-2" 
                    />
                </div>
                
                <div>
                    <label htmlFor="apellido" className="block font-semibold">Apellido:</label>
                    <input 
                        type="text" 
                        id="apellido" 
                        name="apellido" 
                        value={formData.apellido}
                        onChange={handleChange}
                        required 
                        disabled={loading}
                        className="w-full border border-gray-300 rounded px-3 py-2" 
                    />
                </div>
                
                <div>
                    <label htmlFor="fechaNacimiento" className="block font-semibold">Fecha de Nacimiento:</label>
                    <input 
                        type="date" 
                        id="fechaNacimiento" 
                        name="fechaNacimiento" 
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                        required 
                        disabled={loading}
                        className="w-full border border-gray-300 rounded px-3 py-2" 
                    />
                </div>
                
                <div>
                    <label htmlFor="email" className="block font-semibold">Correo Electrónico:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                        disabled={loading}
                        className="w-full border border-gray-300 rounded px-3 py-2" 
                    />
                </div>
                
                <div>
                    <label htmlFor="password" className="block font-semibold">Contraseña:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={formData.password}
                        onChange={handleChange}
                        required 
                        disabled={loading}
                        minLength="6"
                        className="w-full border border-gray-300 rounded px-3 py-2" 
                    />
                    <small className="text-gray-500">Mínimo 6 caracteres</small>
                </div>
                
                <div>
                    <label htmlFor="tema" className="block font-semibold">Tema Favorito (opcional):</label>
                    <select 
                        id="tema" 
                        name="tema" 
                        value={formData.tema}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                        <option value="">-- Seleccionar --</option>
                        <option value="fantasia">Fantasía</option>
                        <option value="fisica">Física</option>
                        <option value="ciencia_ficcion">Ciencia Ficción</option>
                        <option value="policiales">Policiales</option>
                        <option value="romance">Romance</option>
                        <option value="terror">Terror</option>
                        <option value="historia">Historia</option>
                        <option value="biografia">Biografía</option>
                    </select>
                    <small className="text-gray-500">
                        Este campo es solo informativo y no se guardará en tu perfil
                    </small>
                </div>
                
                {error && (
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center">
                        ❌ {error}
                    </div>
                )}
                
                {success && (
                    <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded text-center">
                        ✅ ¡Registro exitoso! Redirigiendo...
                    </div>
                )}
                
                <div className="text-center mt-6">
                    <input
                        type="submit"
                        value={loading ? "Registrando..." : "Registrarse"}
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50 cursor-pointer"
                        disabled={loading}
                    />
                </div>
            </form>
        </div>
    );
};

export default Registro;
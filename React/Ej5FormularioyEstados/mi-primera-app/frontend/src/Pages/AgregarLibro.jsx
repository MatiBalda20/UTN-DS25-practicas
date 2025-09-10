import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3001/api';

export default function AgregarLibro() {
    const navigate = useNavigate();
    const [nuevoLibro, setNuevoLibro] = useState({
        titulo: '',
        autor: '',
        genero: '',
        imagen: '',
    });
    const [exito, setExito] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoLibro(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setExito(false);
        setLoading(true);

        if (nuevoLibro.titulo && nuevoLibro.autor && nuevoLibro.genero && nuevoLibro.imagen) {
            try {
                const response = await fetch(`${API_BASE_URL}/books`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(nuevoLibro)
                });

                const data = await response.json();

                if (data.success) {
                    setExito(true);
                    // Limpiar el formulario
                    setNuevoLibro({
                        titulo: '',
                        autor: '',
                        genero: '',
                        imagen: '',
                    });
                    // Redirigir después de 2 segundos
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                } else {
                    setError(data.message || 'Error al agregar el libro');
                }
            } catch (err) {
                setError('Error de conexión con el servidor');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        } else {
            setError('Todos los campos son obligatorios');
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Agregar nuevo libro
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Título</label>
                    <input
                        type="text"
                        name="titulo"
                        value={nuevoLibro.titulo}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                        disabled={loading}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Autor</label>
                    <input
                        type="text"
                        name="autor"
                        value={nuevoLibro.autor}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                        disabled={loading}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Género</label>
                    <select
                        name="genero"
                        value={nuevoLibro.genero}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                        disabled={loading}
                    >
                        <option value="">-- Seleccionar --</option>
                        <option value="fantasia">Fantasía</option>
                        <option value="fisica">Física</option>
                        <option value="ciencia-ficcion">Ciencia Ficción</option>
                        <option value="policiales">Policiales</option>
                        <option value="romance">Romance</option>
                        <option value="terror">Terror</option>
                        <option value="historia">Historia</option>
                        <option value="biografia">Biografía</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-gray-700">URL de la Imagen</label>
                    <input
                        type="url"
                        name="imagen"
                        value={nuevoLibro.imagen}
                        onChange={handleChange}
                        placeholder="https://ejemplo.com/imagen.jpg"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                        disabled={loading}
                    />
                    <small className="text-gray-500 text-sm">
                        Ingresa la URL de la imagen de la portada del libro
                    </small>
                </div>
                
                {/* Vista previa de la imagen */}
                {nuevoLibro.imagen && (
                    <div className="mt-4">
                        <label className="block mb-1 font-semibold text-gray-700">Vista previa:</label>
                        <img 
                            src={nuevoLibro.imagen} 
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
                    disabled={loading}
                >
                    {loading ? 'Agregando...' : 'Agregar libro'}
                </button>
            </form>
            
            {error && (
                <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center">
                    ❌ {error}
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
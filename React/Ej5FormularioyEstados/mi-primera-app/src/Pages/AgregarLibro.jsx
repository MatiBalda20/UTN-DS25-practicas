import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

export default function AgregarLibro() {
    const { setCatalogo } = useOutletContext();
    const navigate = useNavigate();

    const [nuevoLibro, setNuevoLibro] = useState({
        titulo: '',
        autor: '',
        genero: '',
        img: '/Img/placeholder.jpg', // imagen fija por ahora
    });

    const [exito, setExito] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoLibro(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nuevoLibro.titulo && nuevoLibro.autor && nuevoLibro.genero) {
            setCatalogo(prev => [...prev, nuevoLibro]);
            setExito(true);
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
                        name="titulo"
                        value={nuevoLibro.titulo}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Autor</label>
                    <input
                        name="autor"
                        value={nuevoLibro.autor}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Género</label>
                    <input
                        name="genero"
                        value={nuevoLibro.genero}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Agregar libro
                </button>
            </form>

            {exito && (
                <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded text-center">
                    ✅ ¡Libro agregado con éxito!
                </div>
            )}
        </div>
    );
}
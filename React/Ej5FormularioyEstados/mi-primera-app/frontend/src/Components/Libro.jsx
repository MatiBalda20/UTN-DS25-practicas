// src/components/Libro.jsx
import { useState } from "react";
import { getUserFromToken } from "../helpers/auth";

const Libro = ({ id, titulo, autor, img, imagen, onDelete }) => {
    const imagenSrc = imagen || img;
    const user = getUserFromToken();
    const isAdmin = user?.role === 'ADMIN';
    
    const [deleting, setDeleting] = useState(false);

    const handleImageError = (e) => {
        console.log('Error cargando imagen:', e.target.src);
        e.target.src = 'https://via.placeholder.com/150x200?text=Sin+Portada';
    };

    const handleDelete = async () => {
        if (!window.confirm(`¿Seguro que quieres eliminar "${titulo}"?`)) {
            return;
        }

        setDeleting(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3001/api/books/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                alert('Libro eliminado exitosamente');
                if (onDelete) onDelete(id); // Callback para actualizar la lista
            } else {
                alert(data.message || 'Error al eliminar el libro');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión al eliminar el libro');
        } finally {
            setDeleting(false);
        }
    };

    const ButtonClass = favorito
        ? 'Fav-card-button Fav'
        : 'Fav-card-button';

    return (
        <div className="w-52 bg-white shadow-md rounded-lg p-4 text-center flex flex-col items-center transition hover:shadow-lg">
            <h4 className="font-bold mb-1 line-clamp-2">{titulo}</h4>
            <p className="text-sm text-gray-700 mb-2">{autor}</p>
            <img
                src={imagenSrc || 'https://via.placeholder.com/150x200?text=Sin+Portada'}
                alt={`Portada de ${titulo}`}
                className="h-40 object-cover rounded mb-3"
                onError={handleImageError}
            />
            
            <div className="w-full space-y-2">
                {/* Botón de eliminar - solo visible para ADMIN */}
                {isAdmin && (
                    <button 
                        onClick={handleDelete}
                        disabled={deleting}
                        className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
                    >
                        {deleting ? 'Eliminando...' : '🗑️ Eliminar (Admin)'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Libro;
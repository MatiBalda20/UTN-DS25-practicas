import { useEffect, useState } from "react";

// Para Vite, usar URL completa es más directo
const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function useLibrosPorGenero(genero, limit = 12) {
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!genero) {
            setLibros([]);
            setLoading(false);
            return;
        }
        
        setLoading(true);
        setError(null);

        console.log(`Fetching books for genre: ${genero}`);

        // Usar URL completa para evitar problemas con Vite
        fetch(`${API_BASE_URL}/books/genre/${genero}?limit=${limit}`)
        .then((res) => {
            console.log(`Response status: ${res.status}`);
            if (!res.ok) {
                throw new Error(`Error ${res.status}: ${res.statusText}`);
            }
            return res.json();
        })
        .then((response) => {
            console.log('Response from backend:', response);
            
            if (response.success && response.data) {
                setLibros(response.data);
            } else {
                throw new Error(response.message || 'Error al obtener libros');
            }
            setLoading(false);
        })
        .catch((err) => {
            console.error('Error fetching books:', err);
            setError(err.message);
            setLibros([]);
            setLoading(false);
        });
    }, [genero, limit]);

    return { libros, loading, error };
}
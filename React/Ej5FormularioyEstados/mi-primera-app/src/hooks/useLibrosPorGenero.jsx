import { useEffect, useState } from "react";

export default function useLibrosPorGenero(genero, limit = 12) {
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!genero) return;

        setLoading(true);

        fetch(`https://openlibrary.org/subjects/${genero}.json?limit=${limit}`)
        .then((res) => res.json())
        .then((data) => {
            const librosApi = data.works.map((l) => ({
            titulo: l.title,
            autor: l.authors?.[0]?.name || "Autor desconocido",
            img: l.cover_id
                ? `https://covers.openlibrary.org/b/id/${l.cover_id}-M.jpg`
                : "https://via.placeholder.com/150x200?text=Sin+Portada",
            }));
            setLibros(librosApi);
            setLoading(false);
        })
        .catch(() => setLoading(false));
    }, [genero, limit]);

    return { libros, loading };
}

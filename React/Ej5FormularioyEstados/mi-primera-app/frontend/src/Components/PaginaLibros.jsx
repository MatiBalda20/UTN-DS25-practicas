import Libro from "./Libro";
import useLibrosPorGenero from "../hooks/useLibrosPorGenero";

export default function PaginaLibros({ tituloPagina, genero }) {
    const { libros, loading, error } = useLibrosPorGenero(genero, 12);
    
    // Divide libros en grupos de 3
    const grupos = [];
    for (let i = 0; i < libros.length; i += 3) {
        grupos.push(libros.slice(i, i + 3));
    }

    return (
        <main className="p-6">
            <h2 className="text-3xl font-bold text-black mb-6">
                {tituloPagina}:
            </h2>
            
            {loading && (
                <p className="text-gray-600">Cargando libros...</p>
            )}
            
            {error && (
                <div className="text-red-600 bg-red-100 p-4 rounded mb-4">
                    <p>Error: {error}</p>
                    <p className="text-sm mt-2">
                        Verifica que el servidor esté corriendo en http://localhost:3001
                    </p>
                </div>
            )}
            
            {!loading && !error && libros.length === 0 && (
                <p className="text-gray-600">
                    No se encontraron libros para el género "{genero}"
                </p>
            )}
            
            {!loading && !error && libros.length > 0 && (
                grupos.map((grupo, index) => (
                    <section
                        key={index}
                        className="flex gap-[10vh] p-5 h-[40vh] bg-[#fcfcfc] flex-wrap justify-center mt-4"
                    >
                        {grupo.map((libro, i) => (
                            <Libro key={libro.id || i} {...libro} />
                        ))}
                    </section>
                ))
            )}
        </main>
    );
}
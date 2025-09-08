import Libro from "./Libro";
import useLibrosPorGenero from "../hooks/useLibrosPorGenero"; 

export default function PaginaLibros({ tituloPagina, genero }) {
    const { libros, loading } = useLibrosPorGenero(genero, 12);

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

        {loading ? (
            <p className="text-gray-600">Cargando libros...</p>
        ) : (
            grupos.map((grupo, index) => (
            <section
                key={index}
                className="flex gap-[10vh] p-5 h-[40vh] bg-[#fcfcfc] flex-wrap justify-center mt-4"
            >
                {grupo.map((libro, i) => (
                <Libro key={i} {...libro} />
                ))}
            </section>
            ))
        )}
        </main>
    );
}

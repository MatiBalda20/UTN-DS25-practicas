import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Libro from '../Components/Libro';
import Section from '../Components/Section';

export default function Home() {
    const { catalogo } = useOutletContext();
    const [busqueda, setBusqueda] = useState('');

    const secciones = [
        {
            id: "fantasia",
            title: "Fantasía",
            link: "/fantasia",
            libroDestacado: catalogo.find(libro => libro.genero === "Fantasía")
        },
        {
            id: "fisica",
            title: "Física",
            link: "/fisica",
            libroDestacado: catalogo.find(libro => libro.genero === "Física")
        },
        {
            id: "ciencia-ficcion",
            title: "Ciencia Ficción",
            link: "/ciencia-ficcion",
            libroDestacado: catalogo.find(libro => libro.genero === "Ciencia Ficción")
        },
        {
            id: "policiales",
            title: "Policiales",
            link: "/policiales",
            libroDestacado: catalogo.find(libro => libro.genero === "Policiales")
        }
    ];

    const resultados = catalogo.filter((libro) =>
        libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        libro.autor.toLowerCase().includes(busqueda.toLowerCase()) ||
        libro.genero.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
                Catálogo de Libros
            </h2>

            {/* Input de búsqueda con icono */}
            <div className="relative mb-8 max-w-xl mx-auto">
                <input
                    type="text"
                    placeholder="Buscar por título, autor o género..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
            </div>

            {busqueda === '' ? (
                <>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Secciones</h3>
                    <div className="flex flex-wrap gap-10 p-5 justify-center bg-[#fcfcfc] rounded-lg shadow-md">
                        {secciones.map(sec => (
                            sec.libroDestacado && (
                                <Section
                                    key={sec.id}
                                    id={sec.id}
                                    title={sec.title}
                                    link={sec.link}
                                    subtitle={sec.libroDestacado.titulo}
                                    author={sec.libroDestacado.autor}
                                    img={sec.libroDestacado.img}
                                />
                            )
                        ))}
                    </div>
                </>
            ) : resultados.length === 0 ? (
                <p className="text-red-600 text-center mt-10">⚠️ No se encontraron resultados.</p>
            ) : (
                <>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
                        Resultados de búsqueda
                    </h3>
                    <div className="flex flex-wrap gap-10 p-5 justify-center bg-[#fcfcfc] rounded-lg shadow-md">
                        {resultados.map((libro, index) => (
                            <Libro
                                key={index}
                                titulo={libro.titulo}
                                autor={libro.autor}
                                img={libro.img}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}


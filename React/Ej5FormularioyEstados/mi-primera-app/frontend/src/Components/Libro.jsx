const Libro = ({ titulo, autor, img, imagen }) => {
    // Usar 'imagen' como prop principal, fallback a 'img' por compatibilidad
    const imagenSrc = imagen || img;
    
    const handleImageError = (e) => {
        console.log(`Error cargando imagen: ${e.target.src}`);
        console.log('Props recibidas:', { titulo, autor, img, imagen, imagenSrc });
        e.target.src = 'https://via.placeholder.com/150x200?text=Sin+Portada';
    };

    // Debug: mostrar en consola las props recibidas
    console.log('Libro component props:', { titulo, autor, img, imagen, imagenSrc });

    return (
        <div className="w-52 bg-white shadow-md rounded-lg p-4 text-center flex flex-col items-center hover:shadow-xl transition">
            <h4 className="font-bold mb-1">{titulo}:</h4>
            <p className="text-sm text-gray-700 mb-2">{autor}</p>
            <img
                src={imagenSrc || 'https://via.placeholder.com/150x200?text=Sin+Portada'}
                alt={`Portada de ${titulo}`}
                className="h-40 object-cover rounded"
                onError={handleImageError}
                onLoad={() => console.log(`Imagen cargada correctamente: ${imagenSrc}`)}
            />
        </div>
    );
};

export default Libro;
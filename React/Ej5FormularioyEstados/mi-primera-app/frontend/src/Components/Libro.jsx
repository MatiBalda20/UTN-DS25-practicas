const Libro = ({ titulo, autor, img }) => {
    const handleImageError = (e) => {
        console.log(`Error cargando imagen: ${e.target.src}`);
        e.target.src = 'https://via.placeholder.com/150x200?text=Sin+Portada';
    };

    return (
        <div className="w-52 bg-white shadow-md rounded-lg p-4 text-center flex flex-col items-center hover:shadow-xl transition">
        <h4 className="font-bold mb-1">{titulo}:</h4>
        <p className="text-sm text-gray-700 mb-2">{autor}</p>
        <img
            src={img}
            alt={`Portada de ${titulo}`}
            className="h-40 object-cover rounded"
            onError={handleImageError}
        />
        </div>
    );
};

export default Libro;
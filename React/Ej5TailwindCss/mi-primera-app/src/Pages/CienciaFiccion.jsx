import Libro from '../Components/Libro.jsx'

const CienciaFiccion = () => (
    <div className="p-6">
        <h2 className="text-3xl font-bold text-black">
        Ciencia Ficción:
        </h2>

        <div className="flex gap-[10vh] p-5 h-[40vh] bg-[#fcfcfc] flex-wrap justify-center">
        <Libro
            titulo="Dune 1"
            autor="Frank Herbert"
            img="/Img/dune 1.jpg"
        />
        <Libro
            titulo="El mesías de Dune"
            autor="Frank Herbert"
            img="/Img/dune2.jpg"
        />
        <Libro
            titulo="Hijos de Dune"
            autor="Frank Herbert"
            img="/Img/dune3.jpg"
        />
        </div>

        <div className="flex gap-[10vh] p-5 h-[40vh] bg-[#fcfcfc] flex-wrap justify-center mt-4">
        <Libro
            titulo="Dios emperador de Dune"
            autor="Frank Herbert"
            img="/Img/dune4.jpg"
        />
        <Libro
            titulo="Herejes de Dune"
            autor="Frank Herbert"
            img="/Img/dune5.jpg"
        />
        <Libro
            titulo="Casa Capitular Dune"
            autor="Frank Herbert"
            img="/Img/dune6.jpg"
        />
        </div>
    </div>
);

export default CienciaFiccion;
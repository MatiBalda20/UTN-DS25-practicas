import Libro from '../Components/Libro';

const Fantasia = () => (
    <div className="p-6">
        <h2 className="text-3xl font-bold text-black mb-6">Fantasia:</h2>

        <div className="flex gap-[10vh] p-5 h-[40vh] bg-[#fcfcfc] flex-wrap justify-center">
        <Libro 
            titulo="Harry Potter y la piedra filosofal" 
            autor="J.K Rowling" 
            img="/Img/harry1.jpg" 
        />
        <Libro 
            titulo="Harry Potter y la cámara secreta" 
            autor="J.K Rowling" 
            img="/Img/harry2.jpg" 
        />
        <Libro 
            titulo="Harry Potter y el prisionero de Azkaban" 
            autor="J.K Rowling" 
            img="/Img/harry3.jpg" 
        />
        </div>

        <div className="flex gap-[10vh] p-5 h-[40vh] bg-[#fcfcfc] flex-wrap justify-center mt-4">
        <Libro 
            titulo="Harry Potter y el cáliz de fuego" 
            autor="J.K Rowling" 
            img="/Img/harry4.jpg" 
        />
        <Libro 
            titulo="Harry Potter y la Orden del Fénix" 
            autor="J.K Rowling" 
            img="/Img/harry5.jpg" 
        />
        <Libro 
            titulo="Harry Potter y el misterio del príncipe" 
            autor="J.K Rowling" 
            img="/Img/harry6.jpg" 
        />
        </div>
    </div>
);

export default Fantasia;
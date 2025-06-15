import React from 'react';
import Libro from '../Components/Libro';

const Policiales = () => (
    <div className="p-6">
        <h2 className="text-3xl font-bold text-black mb-6">Policiales:</h2>
        
        <div className="flex gap-[10vh] p-5 h-[40vh] bg-[#fcfcfc] flex-wrap justify-center">
        <Libro
            titulo="Sherlock Holmes: Estudio en escarlata"
            autor="Sir Arthur Conan Doyle"
            img="/Img/holmes 1.jpg"
        />
        <Libro
            titulo="Sherlock Holmes: El signo de los cuatro"
            autor="Sir Arthur Conan Doyle"
            img="/Img/holmes2.jpg"
        />
        <Libro
            titulo="Sherlock Holmes: El sabueso de Baskerville"
            autor="Sir Arthur Conan Doyle"
            img="/Img/holmes3.jpg"
        />
        </div>

        <div className="flex gap-[10vh] p-5 h-[40vh] bg-[#fcfcfc] flex-wrap justify-center mt-4">
        <Libro
            titulo="Sherlock Holmes: El valle del terror"
            autor="Sir Arthur Conan Doyle"
            img="/Img/holmes4.jpg"
        />
        <Libro
            titulo="El asedio"
            autor="Arturo Pérez-Reverte"
            img="/Img/holmes5.jpg"
        />
        <Libro
            titulo="Cuentos policiales"
            autor="Edgar Allan Poe"
            img="/Img/holmes6.jpg"
        />
        </div>
    </div>
);

export default Policiales;
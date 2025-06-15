import React from 'react';
import Libro from '../Components/Libro';

const Fisica = () => (
    <div className="p-6">
        <h2 className="text-3xl font-bold text-black mb-6">Física:</h2>
        
        <div className="flex gap-[10vh] p-5 h-[40vh] bg-[#fcfcfc] flex-wrap justify-center">
        <Libro 
            titulo="El Bosón de Higgs" 
            autor="Javier Santaolalla" 
            img="/Img/boson .jpg" 
        />
        <Libro 
            titulo="Física, conceptos y aplicaciones" 
            autor="Paul E. Tippens" 
            img="/Img/fisica1.jpg" 
        />
        <Libro 
            titulo="El libro de la física" 
            autor="Clifford A. Pickover" 
            img="/Img/fisica2.jpg" 
        />
        </div>
        <div className="flex gap-[10vh] p-5 h-[40vh] bg-[#fcfcfc] flex-wrap justify-center mt-4">
        <Libro 
            titulo="Introducción a la física" 
            autor="Alberto Rubio Ponce" 
            img="/Img/fisica3.jpg" 
        />
        <Libro 
            titulo="Física volumen 1" 
            autor="Thomas A. Moore" 
            img="/Img/fisica4.jpg" 
        />
        <Libro 
            titulo="Física cuántica" 
            autor="Carlos Sánchez del Río" 
            img="/Img/fisica5.jpg" 
        />
        </div>
    </div>
);

export default Fisica;
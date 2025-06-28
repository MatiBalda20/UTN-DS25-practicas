import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function CatalogoLayout() {
    const [catalogo, setCatalogo] = useState([
        { genero: "Fantasía", titulo: "Harry Potter y la piedra filosofal", autor: "J.K Rowling", img: "/Img/harry1.jpg" },
        { genero: "Física", titulo: "El Bosón de Higgs", autor: "Javier Santaolalla", img: "/Img/boson .jpg" },
        { genero: "Ciencia Ficción", titulo: "Dune 1", autor: "Frank Herbert", img: "/Img/dune 1.jpg" },
        { genero: "Policiales", titulo: "Sherlock Holmes: Estudio en escarlata", autor: "Sir Arthur Conan Doyle", img: "/Img/holmes 1.jpg" },
        { genero: "Ciencia Ficción", titulo: "El mesías de Dune", autor: "Frank Herbert", img: "/Img/dune2.jpg" },
        { genero: "Ciencia Ficción", titulo: "Hijos de Dune", autor: "Frank Herbert", img: "/Img/dune3.jpg" },
        { genero: "Ciencia Ficción", titulo: "Dios emperador de Dune", autor: "Frank Herbert", img: "/Img/dune4.jpg" },
        { genero: "Ciencia Ficción", titulo: "Herejes de Dune", autor: "Frank Herbert", img: "/Img/dune5.jpg" },
        { genero: "Ciencia Ficción", titulo: "Casa Capitular Dune", autor: "Frank Herbert", img: "/Img/dune6.jpg" },
        { genero: "Fantasía", titulo: "Harry Potter y la cámara secreta", autor: "J.K Rowling", img: "/Img/harry2.jpg" },
        { genero: "Fantasía", titulo: "Harry Potter y el prisionero de Azkaban", autor: "J.K Rowling", img: "/Img/harry3.jpg" },
        { genero: "Fantasía", titulo: "Harry Potter y el cáliz de fuego", autor: "J.K Rowling", img: "/Img/harry4.jpg" },
        { genero: "Fantasía", titulo: "Harry Potter y la Orden del Fénix", autor: "J.K Rowling", img: "/Img/harry5.jpg" },
        { genero: "Fantasía", titulo: "Harry Potter y el misterio del príncipe", autor: "J.K Rowling", img: "/Img/harry6.jpg" },
        { genero: "Física", titulo: "Física, conceptos y aplicaciones", autor: "Paul E. Tippens", img: "/Img/fisica1.jpg" },
        { genero: "Física", titulo: "El libro de la física", autor: "Clifford A. Pickover", img: "/Img/fisica2.jpg" },
        { genero: "Física", titulo: "Introducción a la física", autor: "Alberto Rubio Ponce", img: "/Img/fisica3.jpg" },
        { genero: "Física", titulo: "Física volumen 1", autor: "Thomas A. Moore", img: "/Img/fisica4.jpg" },
        { genero: "Física", titulo: "Física cuántica", autor: "Carlos Sánchez del Río", img: "/Img/fisica5.jpg" },
        { genero: "Policiales", titulo: "Sherlock Holmes: El signo de los cuatro", autor: "Sir Arthur Conan Doyle", img: "/Img/holmes2.jpg" },
        { genero: "Policiales", titulo: "Sherlock Holmes: El sabueso de Baskerville", autor: "Sir Arthur Conan Doyle", img: "/Img/holmes3.jpg" },
        { genero: "Policiales", titulo: "Sherlock Holmes: El valle del terror", autor: "Sir Arthur Conan Doyle", img: "/Img/holmes4.jpg" },
        { genero: "Policiales", titulo: "El asedio", autor: "Arturo Pérez-Reverte", img: "/Img/holmes5.jpg" },
        { genero: "Policiales", titulo: "Cuentos policiales", autor: "Edgar Allan Poe", img: "/Img/holmes6.jpg" },
    ]);

    return (
        <Outlet context={{ catalogo, setCatalogo }} />
    );
}
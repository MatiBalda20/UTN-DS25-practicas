import React from 'react';
import Section from '../Components/Section';

const Home = () => (
    <div>
        <h2>Secciones:</h2>
            <div id="contenido">
            <Section
                id="fantasia"
                title="Fantasia"
                link="/fantasia"
                subtitle="Harry Potter y la piedra filosofal"
                author="J.K Rowling"
                img="/Img/harry1.jpg"
            />
            <Section
                id="fisica"
                title="Fisica"
                link="/fisica"
                subtitle="El Boson de Higgs"
                author="Javier Santaolalla"
                img="Img/boson .jpg"
            />
            <Section
                id="ciencia ficcion"
                title="Ciencia Ficcion"
                link="/ciencia-ficcion"
                subtitle="Dune 1"
                author="Frank Hegbert"
                img="/Img/dune 1.jpg"
            />
            <Section
                id="policiales"
                title="Policiales"
                link="/policiales"
                subtitle="Sherlock Holmes estudio en escarlata"
                author="Sir Arthur Conan Doyle"
                img="/Img/holmes 1.jpg"
            />
        </div>
    </div>
);

export default Home;





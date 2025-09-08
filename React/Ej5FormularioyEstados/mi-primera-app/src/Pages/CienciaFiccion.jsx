import { useOutletContext } from 'react-router-dom';
import PaginaLibros from '../Components/PaginaLibros';

export default function CienciaFiccion() {
    const { catalogo } = useOutletContext();
    const librosSciFi = catalogo.filter(libro => libro.genero === "Ciencia Ficción");

    return <PaginaLibros tituloPagina="Ciencia Ficción" genero="science_fiction"  />;
}
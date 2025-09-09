import { useOutletContext } from 'react-router-dom';
import PaginaLibros from '../Components/PaginaLibros';

export default function Fantasia() {
    const { catalogo } = useOutletContext();
    const librosFantasia = catalogo.filter(libro => libro.genero === "Fantasía");

    return <PaginaLibros tituloPagina="Fantasía" genero="fantasia"  />;
}
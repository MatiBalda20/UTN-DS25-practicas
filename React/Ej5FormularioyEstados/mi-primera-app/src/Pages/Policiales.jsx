import { useOutletContext } from 'react-router-dom';
import PaginaLibros from '../Components/PaginaLibros';

export default function Policiales() {
    const { catalogo } = useOutletContext();
    const librosPoliciales = catalogo.filter(libro => libro.genero === "Policiales");

    return <PaginaLibros tituloPagina="Policiales" libros={librosPoliciales} />;
}
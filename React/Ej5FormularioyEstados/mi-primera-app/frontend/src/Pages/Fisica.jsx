import { useOutletContext } from 'react-router-dom';
import PaginaLibros from '../Components/PaginaLibros';

export default function Fisica() {
    const { catalogo } = useOutletContext();
    const librosFisica = catalogo.filter(libro => libro.genero === "Física");

    return <PaginaLibros tituloPagina="Física" genero="fisica"  />;
}
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => (
    <div id="menu">
        <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/fantasia">Fantasia</Link></li>
        <li><Link to="/fisica">Fisica</Link></li>
        <li><Link to="/ciencia-ficcion">Ciencia Ficcion</Link></li>
        <li><Link to="/policiales">Policiales</Link></li>
        <li><Link to="/registro">Registrarse</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        </ul>
    </div>
);

export default Menu;
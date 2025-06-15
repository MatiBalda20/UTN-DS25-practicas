import React from 'react';

const Contacto = () => (
    <div>
        <h1>Contacto:</h1>
        <div id="contenido">
        <ul>
            <p>Email: libreria@hotmail.com</p>
            <p>Teléfono: 11 345981</p>
            <p>Dirección: 7 362</p>
        </ul>
        <div id="contenido">
            <form id="formulario">
            <label htmlFor="nombre">Nombre:</label><br />
            <input type="text" id="nombre" name="nombre" required /><br /><br />

            <label htmlFor="email">Correo electrónico:</label><br />
            <input type="email" id="email" name="email" required /><br /><br />

            <label htmlFor="mensaje">Problema:</label><br />
            <textarea id="mensaje" name="mensaje" rows="4" cols="30"></textarea><br /><br />

            <input type="submit" value="Enviar" />
            </form>
        </div>
        </div>
    </div>
);

export default Contacto;









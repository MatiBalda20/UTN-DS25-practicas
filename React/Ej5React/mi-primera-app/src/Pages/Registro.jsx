import React from 'react';

const Registro = () => (
    <div id="contenido">
        <form id="formulario">
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required />

        <label htmlFor="apellido">Apellido:</label>
        <input type="text" id="apellido" name="apellido" required />

        <label htmlFor="nacimiento">Fecha de Nacimiento:</label>
        <input type="date" id="nacimiento" name="nacimiento" required />

        <label htmlFor="email">Correo Electrónico:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="contrasena">Contraseña:</label>
        <input type="password" id="contrasena" name="contrasena" required />

        <label>Sexo:</label>
        <input type="radio" id="masculino" name="sexo" value="Masculino" required />
        <label htmlFor="masculino" style={{ display: 'inline' }}>Masculino</label>
        <input type="radio" id="femenino" name="sexo" value="Femenino" />
        <label htmlFor="femenino" style={{ display: 'inline' }}>Femenino</label>

        <label htmlFor="tema">Tema Favorito:</label>
        <select id="tema" name="tema" required>
            <option value="">-- Seleccionar --</option>
            <option value="fantasia">Fantasía</option>
            <option value="fisica">Física</option>
            <option value="ciencia_ficcion">Ciencia Ficción</option>
            <option value="policiales">Policiales</option>
        </select>

        <br /><br />
        <input type="submit" value="Registrarse" />
        </form>
    </div>
);

export default Registro;
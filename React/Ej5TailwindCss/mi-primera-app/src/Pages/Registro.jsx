import React from 'react';

const Registro = () => (
    <div className="flex justify-center items-center min-h-screen bg-[#fcfcfc] p-6">
        <form className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Registro</h2>

        <div>
            <label htmlFor="nombre" className="block font-semibold">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>

        <div>
            <label htmlFor="apellido" className="block font-semibold">Apellido:</label>
            <input type="text" id="apellido" name="apellido" required className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>

        <div>
            <label htmlFor="nacimiento" className="block font-semibold">Fecha de Nacimiento:</label>
            <input type="date" id="nacimiento" name="nacimiento" required className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>

        <div>
            <label htmlFor="email" className="block font-semibold">Correo Electrónico:</label>
            <input type="email" id="email" name="email" required className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>

        <div>
            <label htmlFor="contrasena" className="block font-semibold">Contraseña:</label>
            <input type="password" id="contrasena" name="contrasena" required className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>

        <div>
            <span className="block font-semibold mb-1">Sexo:</span>
            <div className="flex items-center gap-4">
            <label className="flex items-center gap-1">
                <input type="radio" name="sexo" value="Masculino" required />
                Masculino
            </label>
            <label className="flex items-center gap-1">
                <input type="radio" name="sexo" value="Femenino" />
                Femenino
            </label>
            </div>
        </div>

        <div>
            <label htmlFor="tema" className="block font-semibold">Tema Favorito:</label>
            <select id="tema" name="tema" required className="w-full border border-gray-300 rounded px-3 py-2">
            <option value="">-- Seleccionar --</option>
            <option value="fantasia">Fantasía</option>
            <option value="fisica">Física</option>
            <option value="ciencia_ficcion">Ciencia Ficción</option>
            <option value="policiales">Policiales</option>
            </select>
        </div>

        <div className="text-center mt-6">
            <input
            type="submit"
            value="Registrarse"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            />
        </div>
        </form>
    </div>
);

export default Registro;
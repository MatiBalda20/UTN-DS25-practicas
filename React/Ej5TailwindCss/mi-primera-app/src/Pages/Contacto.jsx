import React from 'react';

const Contacto = () => (
    <div className="min-h-screen bg-[#fcfcfc] p-6">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">Contacto</h1>

        <div className="flex flex-wrap justify-center gap-10">

        {/* Información de contacto */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Información</h2>
            <p className="mb-2"><strong>Email:</strong> libreria@hotmail.com</p>
            <p className="mb-2"><strong>Teléfono:</strong> 11 345981</p>
            <p className="mb-2"><strong>Dirección:</strong> Calle 7 Nº 362</p>
        </div>

        {/* Formulario de contacto */}
        <form className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">¿Tenés un problema?</h2>

            <div>
            <label htmlFor="nombre" className="block font-semibold">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>

            <div>
            <label htmlFor="email" className="block font-semibold">Correo electrónico:</label>
            <input type="email" id="email" name="email" required className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>

            <div>
            <label htmlFor="mensaje" className="block font-semibold">Mensaje:</label>
            <textarea id="mensaje" name="mensaje" rows="4" className="w-full border border-gray-300 rounded px-3 py-2"></textarea>
            </div>

            <div className="text-center">
            <input
                type="submit"
                value="Enviar"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            />
            </div>
        </form>
        </div>
    </div>
);

export default Contacto;









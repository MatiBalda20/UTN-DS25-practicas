import React from 'react';

const Header = () => (
    <div className="bg-[url('/Img/cabecera.jpg')] bg-cover bg-center text-white p-5 flex items-center gap-5">
        <img src="/Img/logo.jpg" alt="Logo de la librería" className="h-20" />
        <h1 className="text-2xl font-bold">Librería</h1>
    </div>
);

export default Header;
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header.jsx';
import Menu from './Components/Menu.jsx';
import Footer from './Components/Footer.jsx';
import Fantasia from './Pages/Fantasia.jsx';
import Home from './Pages/Home.jsx';
import Fisica from './Pages/Fisica.jsx';
import CienciaFiccion from './Pages/CienciaFiccion.jsx';
import Policiales from './Pages/Policiales.jsx';
import Registro from './Pages/Registro.jsx';
import Contacto from './Pages/Contacto.jsx';
import Login from './Pages/Login.jsx';
import CatalogoLayout from './Layouts/CatalogoLayout.jsx';
import AgregarLibro from './Pages/AgregarLibro.jsx';
import './index.css';

function App() {
  return (
    <Router>
      <div id="main">
        <Header />
        <Menu />
        <Routes>
          <Route path="/" element={<CatalogoLayout />}>
            {/* Rutas públicas */}
            <Route index element={<Home />} />
            <Route path="fantasia" element={<Fantasia />} />
            <Route path="fisica" element={<Fisica />} />
            <Route path="ciencia-ficcion" element={<CienciaFiccion />} />
            <Route path="policiales" element={<Policiales />} />
            <Route path="agregar" element={<AgregarLibro />} />
            <Route path="contacto" element={<Contacto />} />
            
            {/* Rutas de autenticación */}
            <Route path="registro" element={<Registro />} />
            <Route path="login" element={<Login />} />

          </Route>

          {/* Ruta 404 */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-2xl text-gray-600 mb-8">Página no encontrada</p>
                <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                  Volver al inicio
                </a>
              </div>
            </div>
          } />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
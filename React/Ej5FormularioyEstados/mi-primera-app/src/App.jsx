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
            <Route path="/" element={<Home />} />
            <Route path="fantasia" element={<Fantasia />} />
            <Route path="fisica" element={<Fisica />} />
            <Route path="ciencia-ficcion" element={<CienciaFiccion />} />
            <Route path="policiales" element={<Policiales />} />
            <Route path="agregar" element={<AgregarLibro />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/contacto" element={<Contacto />} />
          </Route>
        </Routes>
        </div>
        <Footer />
    </Router>
  );
}

export default App;
import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-gray-900 bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <NavLink to="/">
              <h2 className="font-display text-3xl tracking-wide text-white">
                Fragancias <span className="text-purple-400 italic">UY</span>
              </h2>
            </NavLink>
            <p className="mt-4 max-w-sm text-sm leading-7 text-gray-400">
              Selección de fragancias con una estética elegante, moderna y
              pensada para destacar tu identidad en cada detalle.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white">
              Navegación
            </h3>
            <div className="mt-4 space-y-3 text-sm text-gray-400 flex flex-col">
              <NavLink to="/">Inicio</NavLink>
              <NavLink to="/products">Productos</NavLink>
              <NavLink to="/cart">Carrito</NavLink>
              <NavLink to="/login">Ingresar</NavLink>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white">
              Contacto
            </h3>
            <p className="mt-4 text-sm leading-7 text-gray-400">
              Uruguay
              <br />
              Atención de lunes a viernes
              <br />
              soporte@fraganciasuy.com
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-gray-900 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Fragancias UY. Todos los derechos reservados.</p>
          <p className="text-gray-600">Elegancia, presencia y carácter.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

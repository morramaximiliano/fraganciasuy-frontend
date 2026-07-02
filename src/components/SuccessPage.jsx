import React from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { useCart } from "../context/CartState";
import { useEffect } from "react";

const SuccessPage = () => {
  const { clearCart } = useCart();
  useEffect(() => {
    // Esto se ejecuta solo una vez cuando el componente se monta
    clearCart();
  }, [clearCart]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <div className="text-green-500 text-6xl mb-4">✓</div>
      <h1 className="text-2xl font-bold text-white mb-2">¡Compra exitosa!</h1>
      <p className="text-gray-400 mb-6">
        Tu pedido ha sido procesado correctamente. En breve recibirás los
        detalles en tu correo.
      </p>
      <Button as={Link} to="/">
        Volver al inicio
      </Button>
    </div>
  );
};

export default SuccessPage;

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

const PendingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <div className="text-yellow-500 text-6xl mb-4">⏳</div>
      <h1 className="text-2xl font-bold text-white mb-2">Pago pendiente</h1>
      <p className="text-gray-400 mb-6">
        Tu pedido ha sido registrado. Para completar la compra, por favor
        realizá el pago en Abitab o RedPagos con el ticket que te proporcionó
        Mercado Pago.
      </p>

      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-500">
          ¿Ya pagaste? El estado se actualizará en breve.
        </p>
        <Button as={Link} to="/" color="light">
          Volver al inicio
        </Button>
      </div>
    </div>
  );
};

export default PendingPage;

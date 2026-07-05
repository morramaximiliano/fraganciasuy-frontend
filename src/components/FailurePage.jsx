import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

const FailurePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <div className="text-red-500 text-6xl mb-4">✕</div>
      <h1 className="text-2xl font-bold text-white mb-2">
        No pudimos procesar el pago
      </h1>
      <p className="text-gray-400 mb-6">
        Hubo un problema con la transacción. Por favor, intentá nuevamente o
        elegí otro método de pago.
      </p>
      <Button
        type="button"
        color="failure"
        onClick={() => navigate("/cart", { replace: true })}
      >
        Intentar de nuevo
      </Button>
    </div>
  );
};

export default FailurePage;

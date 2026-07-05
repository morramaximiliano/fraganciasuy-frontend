import React, { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useCart } from "../context/CartState";
import api from "../api/axios.js";
import { Button, TextInput, Label } from "flowbite-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const mercadoPagoPublicKey = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;

if (mercadoPagoPublicKey) {
  initMercadoPago(mercadoPagoPublicKey);
} else {
  console.warn("Falta VITE_MERCADOPAGO_PUBLIC_KEY en el entorno.");
}

const CheckoutSection = () => {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [errorInput, setErrorInput] = useState("");

  const handleProcessOrder = async () => {
    if (!address) {
      setErrorInput("Falta la dirección");
      return;
    }
    setErrorInput("");
    setLoading(true);
    let createdOrderId = null;
    try {
      const { data } = await api.post("/orders", {
        shippingAddress: address,
        paymentMethod: "Mercado Pago",
      });
      createdOrderId = data.newOrder.id;
      const { data: mpData } = await api.post("/payments/create-preference", {
        orderId: data.newOrder.id,
        totalAmount: Number(data.newOrder.totalAmount),
      });
      setPreferenceId(mpData.preferenceId);
    } catch (err) {
      console.error("ERROR DETALLADO:", err.response?.data || err.message);
      if (createdOrderId) {
        try {
          await api.delete(`/orders/${createdOrderId}`);
          console.log("orden fallida eliminada correctamente");
        } catch (deleteErr) {
          console.error(deleteErr);
        }
      }
      setErrorInput("Error: " + (err.response?.data?.message || err.message));
      navigate("/failure");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center animate-in fade-in duration-500">
        <div className="bg-white/50 p-8 rounded-2xl shadow-xl border border-gray-100 max-w-sm w-full">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Acceso restringido
          </h2>
          <p className="text-gray-600 mb-6">
            Para continuar, primero debes iniciar sesión en tu cuenta.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02]"
          >
            Ir a iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 border-t border-gray-900 pt-6 flex flex-col gap-5">
      {!preferenceId ? (
        <>
          <h2 className="text-white text-md">Direccion</h2>
          <Label value="Dirección" />
          <TextInput
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errorInput && <p className="text-red-500">{errorInput}</p>}
          <Button onClick={handleProcessOrder} disabled={loading}>
            {loading ? "Procesando..." : "Confirmar"}
          </Button>
        </>
      ) : (
        <Wallet
          key={preferenceId}
          initialization={{ preferenceId: preferenceId }}
          onError={(error) => {
            navigate("/failure");
          }}
        />
      )}
    </div>
  );
};
export default CheckoutSection;

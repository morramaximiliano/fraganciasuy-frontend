import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button, Label, TextInput } from "flowbite-react";
import { EnvelopeFill, LockFill } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import authSchema from "./authSchema.js";
import axios from "../../../api/axios.js";
import { useAuth } from "../../../context/AuthContext";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      const { token, user } = response.data;

      login(user, token);

      toast.success("¡Inicio de sesión exitoso!", { position: "top-right" });

      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de Autenticación",
        text:
          error.response?.data?.message ||
          "Credenciales incorrectas o problema en el servidor.",
        confirmButtonColor: "#1A56DB",
      });
    }
  };

  return (
    <div className="flex justify-center h-screen max-w-screen bg-gray-800 pt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg dark:bg-gray-800"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Bienvenido
        </h2>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          Ingresa a tu cuenta para continuar
        </p>

        <div className="rounded-md border border-blue-100 bg-blue-50/70 px-4 py-3 text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-700/40 dark:text-gray-300">
          <p className="mb-2 font-medium uppercase tracking-wide text-blue-700 dark:text-blue-300">
            Acceso de demostración
          </p>
          <div className="space-y-1">
            <p>
              <span className="text-gray-500 dark:text-gray-400">Correo:</span>{" "}
              <span className="font-mono text-gray-700 dark:text-gray-200">
                admin@admin.com
              </span>
            </p>
            <p>
              <span className="text-gray-500 dark:text-gray-400">Contraseña:</span>{" "}
              <span className="font-mono text-gray-700 dark:text-gray-200">
                admin1234
              </span>
            </p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Tu correo electrónico" />
            </div>
            <TextInput
              id="email"
              type="email"
              icon={EnvelopeFill}
              placeholder="nombre@correo.com"
              color={errors.email ? "failure" : "gray"}
              ref={register("email").ref}
              name={register("email").name}
              onBlur={register("email").onBlur}
              onChange={register("email").onChange}
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Tu contraseña" />
            </div>
            <TextInput
              id="password"
              type="password"
              icon={LockFill}
              placeholder="••••••••"
              color={errors.password ? "failure" : "gray"}
              ref={register("password").ref}
              name={register("password").name}
              onBlur={register("password").onBlur}
              onChange={register("password").onChange}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            color="blue"
          >
            {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default LoginForm;

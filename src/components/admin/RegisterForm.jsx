import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button, Label, TextInput } from "flowbite-react";
import { Person, Envelope, Lock } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { registerSchema } from "./registerSchema.js";
import api from "../../api/axios.js";

export default function RegisterForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const { firstName, lastName, email, password } = data;
      await api.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });

      toast.success("¡Registro completado con éxito!", {
        position: "top-right",
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al registrarse",
        text:
          error.response?.data?.message ||
          "Hubo un problema al crear la cuenta.",
        confirmButtonColor: "#A855F7",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-8 space-y-6 bg-gray-950 border border-gray-900 rounded-lg shadow-xl"
    >
      <h2 className="text-3xl font-bold text-center text-white">
        Crear Cuenta
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="firstName"
                value="Nombre"
                className="text-gray-300"
              />
            </div>
            <TextInput
              id="firstName"
              type="text"
              icon={Person}
              placeholder="Juan"
              color={errors.firstName ? "failure" : "gray"}
              ref={register("firstName").ref}
              name={register("firstName").name}
              onBlur={register("firstName").onBlur}
              onChange={register("firstName").onChange}
            />
            {errors.firstName && (
              <p className="mt-2 text-sm text-red-500 font-medium">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="lastName"
                value="Apellido"
                className="text-gray-300"
              />
            </div>
            <TextInput
              id="lastName"
              type="text"
              icon={Person}
              placeholder="Pérez"
              color={errors.lastName ? "failure" : "gray"}
              ref={register("lastName").ref}
              name={register("lastName").name}
              onBlur={register("lastName").onBlur}
              onChange={register("lastName").onChange}
            />
            {errors.lastName && (
              <p className="mt-2 text-sm text-red-500 font-medium">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="email"
              value="Tu correo electrónico"
              className="text-gray-300"
            />
          </div>
          <TextInput
            id="email"
            type="email"
            icon={Envelope}
            placeholder="nombre@correo.com"
            color={errors.email ? "failure" : "gray"}
            ref={register("email").ref}
            name={register("email").name}
            onBlur={register("email").onBlur}
            onChange={register("email").onChange}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-500 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="password"
              value="Contraseña"
              className="text-gray-300"
            />
          </div>
          <TextInput
            id="password"
            type="password"
            icon={Lock}
            placeholder="••••••••"
            color={errors.password ? "failure" : "gray"}
            ref={register("password").ref}
            name={register("password").name}
            onBlur={register("password").onBlur}
            onChange={register("password").onChange}
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-500 font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="confirmPassword"
              value="Confirmar contraseña"
              className="text-gray-300"
            />
          </div>
          <TextInput
            id="confirmPassword"
            type="password"
            icon={Lock}
            placeholder="••••••••"
            color={errors.confirmPassword ? "failure" : "gray"}
            ref={register("confirmPassword").ref}
            name={register("confirmPassword").name}
            onBlur={register("confirmPassword").onBlur}
            onChange={register("confirmPassword").onChange}
          />
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-500 font-medium">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 enabled:hover:bg-purple-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creando cuenta..." : "Registrarse"}
        </Button>
      </form>

      <p className="text-sm font-light text-center text-gray-400">
        ¿Ya tienes una cuenta?{" "}
        <Link
          to="/login"
          className="font-medium text-purple-400 hover:underline"
        >
          Inicia sesión aquí
        </Link>
      </p>
    </motion.div>
  );
}

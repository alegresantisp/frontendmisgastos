'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext"; // Usar el contexto para obtener funciones
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importa los íconos

export default function AuthForms() {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

  // Obtener las funciones y el estado del contexto
  const { login, register, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Acceder de forma tipada a los valores del formulario
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      if (isRegister) {
        await register(email, password); // Registrar al usuario
      } else {
        await login(email, password); // Iniciar sesión
      }
    } catch {
      // No es necesario manejar el error aquí, el contexto ya lo maneja
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-700 text-white px-4">
      <motion.div
        className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-semibold text-center mb-6">
          {isRegister ? "Crear Cuenta" : "Iniciar Sesión"}
        </h1>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="relative">
            <input
              name="email"
              type="email"
              placeholder="Correo Electrónico"
              className="w-full bg-transparent border-b border-gray-600 focus:border-blue-500 outline-none transition-colors duration-300 pb-2 text-lg"
              required
            />
          </div>

          {/* Password input */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"} // Cambia el tipo del input
              placeholder="Contraseña"
              className="w-full bg-transparent border-b border-gray-600 focus:border-blue-500 outline-none transition-colors duration-300 pb-2 text-lg"
              required
            />
            {/* Ojo para mostrar/ocultar la contraseña */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Cambiar el estado de mostrar la contraseña
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="text-red-500 text-sm text-center mt-2">
              <p>{error}</p>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 font-bold text-lg"
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : isRegister ? "Registrarse" : "Iniciar Sesión"}
          </button>
        </form>

        {/* Toggle Form */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            {isRegister ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}{" "}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-blue-400 underline hover:text-blue-500 transition-colors"
            >
              {isRegister ? "Inicia sesión" : "Regístrate"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { FiLogOut } from "react-icons/fi"; // Ícono de logout
import { useRouter } from "next/navigation";
import { useAuth } from "../Context/AuthContext"; // Importamos el contexto de autenticación

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth(); // Obtenemos la función logout del contexto

  const handleLogout = () => {
    logout(); // Llamamos a logout desde el contexto para limpiar el estado de usuario y localStorage
    router.push("/auth"); // Redirigimos al usuario a la página de autenticación
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center justify-center gap-4 bg-red-500 text-white px-2 py-2 rounded-full hover:bg-red-600 transition-all"
    >
      <FiLogOut size={20} />
    </button>
  );
}

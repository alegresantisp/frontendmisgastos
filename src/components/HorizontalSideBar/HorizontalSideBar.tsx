import Link from "next/link";
import React from "react";
import { FaHome, FaUser, FaChartBar  } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LogoutButton from "../Dashboard/LogoutButton";

const SidebarHorizontal: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white py-2 px-4 z-50">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        {/* Logo o nombre del sitio */}
        <div className="hidden sm:block">
          <h1 className="text-xl font-bold">PocketCare</h1>
        </div>

        {/* Barra de navegación */}
        <div className="flex justify-around sm:justify-end w-full sm:w-auto space-x-4">
          <TooltipProvider>
            {/* Botón Dashboard */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 text-white hover:bg-blue-500 hover:text-blue-100"
                  >
                    <FaHome size={24} />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Dashboard</p>
              </TooltipContent>
            </Tooltip>

            {/* Botón Perfil */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/profile">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 text-white hover:bg-blue-500 hover:text-blue-100"
                  >
                    <FaUser size={24} />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Perfil</p>
              </TooltipContent>
            </Tooltip>

            {/* Botón Eventos */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/statistics">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 text-white hover:bg-blue-500 hover:text-blue-100"
                  >
                    <FaChartBar  size={24} />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Estadísticas</p>
              </TooltipContent>
            </Tooltip>

            {/* Botón Cerrar sesión */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <LogoutButton /> {/* Envuelve LogoutButton en un div */}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cerrar sesión</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default SidebarHorizontal;

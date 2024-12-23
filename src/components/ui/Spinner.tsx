// components/ui/Spinner.tsx
import React from 'react';

export const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen"> {/* Esto asegura que esté centrado en toda la pantalla */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div> {/* Tamaño aumentado */}
    </div>
  );
};

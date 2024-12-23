'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as loginApi, register as registerApi } from '../../helpers/auth';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { useRouter } from 'next/navigation'; // Importa useRouter desde next/navigation

interface User {
  email: string;
  id: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Instancia de useRouter desde next/navigation

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    // Verifica si hay un token válido y un usuario en el localStorage
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser)); // Si hay un usuario guardado en localStorage, lo carga
    } else {
      // Si no hay usuario ni token, redirigir al login
      router.push('/auth');
    }
  }, [router]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { access_token } = await loginApi(email, password);

      if (!access_token) {
        throw new Error('No se recibió el token');
      }

      // Almacena el token solo si es válido
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify({ email, id: 'some-id' })); // Aquí puedes guardar solo un objeto simple como ejemplo.

      setUser({ email, id: 'some-id' }); // Aquí solo asumes un objeto simple

      // Alerta de éxito
      Swal.fire({
        title: '¡Bienvenido!',
        text: 'Inicio de sesión exitoso.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      // Redirige al Dashboard
      router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);  // Usa el mensaje de error
      } else {
        setError('Error en el login');
      }

      // Alerta de error
      Swal.fire({
        title: 'Error',
        text: 'Credenciales incorrectas o problema en el inicio de sesión.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });

      // Redirige a la página de autenticación si hay un error en el login
      router.push('/auth');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await registerApi(email, password);
      await login(email, password); // Iniciar sesión después del registro

      // Alerta de éxito
      Swal.fire({
        title: '¡Registro exitoso!',
        text: 'Ahora puedes iniciar sesión.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    } catch {
      setError('Error en el registro');
      // Alerta de error
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al registrar tu cuenta.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            // Eliminar token y usuario del almacenamiento local
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);

            // Limpiar token de las cookies
            document.cookie = 'auth-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';

            // Alerta de cierre de sesión
            Swal.fire({
                title: '¡Hasta luego!',
                text: 'Gracias por acompañarnos.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
            });

            // Redirige al login después de cerrar sesión
            router.push('/auth');
        }
    });
};

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

const API_URL = 'http://localhost:3001'; // Cambia esta URL según la dirección de tu backend

interface LoginResponse {
  access_token: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Error en el login');
  }

  const data = await response.json();
  
  // Guardar el token en las cookies
  document.cookie = `auth-token=${data.token}; path=/; max-age=86400; secure; samesite=strict`;
  
  return data;
};

export const register = async (email: string, password: string): Promise<void> => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Error en el registro');
  }
};

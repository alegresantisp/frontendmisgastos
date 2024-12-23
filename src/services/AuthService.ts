// services/AuthService.ts

export class AuthService {
    // Verifica si el usuario está autenticado
    static isAuthenticated(): boolean {
      return !!localStorage.getItem('authToken');
    }
  
    // Obtiene el token almacenado en el localStorage
    static getToken(): string | null {
      return localStorage.getItem('authToken');
    }
  
    // Establece el token en el localStorage
    static setToken(token: string): void {
      localStorage.setItem('authToken', token);
    }
  
    // Elimina el token del localStorage
    static logout(): void {
      localStorage.removeItem('authToken');
    }
  
    // Verifica la validez del token (ejemplo con JWT)
    static verifyToken(token: string): boolean {
      try {
        // Aquí puedes usar una librería para verificar el JWT, como 'jsonwebtoken'
        const decoded = JSON.parse(atob(token.split('.')[1])); // Decodificar JWT sin verificar la firma
        const expirationDate = decoded.exp * 1000;
        return Date.now() < expirationDate; // Verifica si el token ha expirado
      } catch (error) {
        console.error('Invalid token', error);
        return false;
      }
    }
  }
  
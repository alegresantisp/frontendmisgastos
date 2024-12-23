import { AuthService } from '@/services/AuthService';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Obtener el token del header Authorization
  const authHeader = request.headers.get('Authorization');
  const headerToken = authHeader?.replace('Bearer ', '');

  // Obtener el token de las cookies
  const cookieToken = request.cookies.get('auth-token')?.value;

  // Usar el token del header si existe, si no, usar el de las cookies
  const token = headerToken || cookieToken;

  // Verificar si el token es válido
  const isValidToken = token && AuthService.verifyToken(token);

  // Bloquear acceso a /auth si el usuario ya está autenticado
  if (request.nextUrl.pathname.startsWith('/auth') && isValidToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Rutas protegidas (requieren autenticación)
  const protectedRoutes = ['/dashboard', '/statistics'];

  const isProtectedRoute = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Si intenta acceder a una ruta protegida sin autenticarse, redirigir a /auth
  if (isProtectedRoute && !isValidToken) {
    // Crear la URL de redirección incluyendo la URL original como parámetro
    const loginUrl = new URL('/auth', request.url);
    loginUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Para rutas protegidas con token válido, añadir el token al header de la respuesta
  if (isProtectedRoute && isValidToken && token) {
    const response = NextResponse.next();
    response.headers.set('Authorization', `Bearer ${token}`);
    return response;
  }

  // Permitir el acceso en cualquier otro caso
  return NextResponse.next();
}

// Configuración de las rutas que serán manejadas por el middleware
export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/statistics/:path*',
    '/auth', // Aseguramos que /auth sea manejado por este middleware
    // Excluir rutas de archivos estáticos
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

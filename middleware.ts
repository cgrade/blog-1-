import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from './lib/jwt'

/**
 * @notice Middleware function for authentication
 * @dev Checks for a valid JWT token in cookies for admin routes
 * @param request - The incoming request object
 */
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log("\n=== Middleware Start ===");
  console.log("Path:", path);
  console.log("Cookies:", request.cookies.getAll());
  
  // Skip middleware for login page and API routes
  if (path.includes('login') || path.startsWith('/api/')) {
    console.log("Skipping middleware for:", path);
    console.log("=== Middleware End ===\n");
    return NextResponse.next();
  }

  // Only run on admin routes
  if (path.startsWith('/admin')) {
    const token = request.cookies.get('token');
    console.log("Found token:", token?.value ? "Yes" : "No");

    if (!token?.value) {
      console.log("No token found, redirecting to login");
      console.log("=== Middleware End ===\n");
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const payload = await verifyToken(token.value);
    if (!payload) {
      console.log("Invalid token, redirecting to login");
      console.log("=== Middleware End ===\n");
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    console.log("Token verified successfully");
    console.log("=== Middleware End ===\n");
    return NextResponse.next();
  }

  // Add pathname to headers for navigation
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  // Return response with updated headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/admin/:path*', "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};


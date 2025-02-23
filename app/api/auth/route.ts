import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { signToken } from '@/lib/jwt'

export async function POST(request: Request) {
  console.log("\n=== Auth Route Start ===");
  try {
    const cookieStore = cookies()
    const storedToken = cookieStore.get('csrf-token')?.value
    const { username, password, csrfToken } = await request.json()

    console.log('Login attempt:', { 
      username,
      hasCSRFToken: Boolean(csrfToken),
      hasStoredToken: Boolean(storedToken)
    });

    // Verify CSRF token
    if (!storedToken || storedToken !== csrfToken) {
      console.log('CSRF token mismatch');
      console.log("=== Auth Route End ===\n");
      return NextResponse.json(
        { success: false, error: 'Invalid CSRF token' },
        { status: 403 }
      );
    }

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      console.log('Credentials verified');
      const token = await signToken({ username, role: 'admin' });
      
      // Create response
      const response = NextResponse.json({
        success: true,
        message: 'Login successful',
        token
      })

      // Set HTTP-only cookie
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 3600 // 1 hour
      })

      console.log('Auth successful, token set');
      console.log("=== Auth Route End ===\n");
      return response
    }

    console.log('Invalid credentials');
    console.log("=== Auth Route End ===\n");
    return NextResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Auth error:', error)
    console.log("=== Auth Route End ===\n");
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
}


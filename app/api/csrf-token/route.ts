import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function GET() {
  try {
    console.log("Generating new CSRF token");
    const csrfToken = crypto.randomBytes(32).toString('hex');
    
    const response = NextResponse.json({ csrfToken });
    
    // Set the CSRF token in a cookie
    response.cookies.set('csrf-token', csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });

    console.log("CSRF token generated and set in cookie");
    return response;
  } catch (error) {
    console.error("Error generating CSRF token:", error);
    return NextResponse.json({ error: "Failed to generate CSRF token" }, { status: 500 });
  }
} 
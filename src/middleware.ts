import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    // Mock auth - check localStorage (client-side only)
    // For demo purposes, allow all routes

    // Redirect root to auth or dashboard based on mock auth
    if (request.nextUrl.pathname === '/') {
        const url = request.nextUrl.clone()
        url.pathname = '/auth'
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
    ],
}

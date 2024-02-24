import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';

const clerkAuthMiddleWare = authMiddleware({
  publicRoutes: [
    '/',
    '/about',
    '/imprint',
    '/privacy',
    '/api/system',
    '/api/graphql',
  ],
  debug: false,
});

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const authResponse = clerkAuthMiddleWare(request, event);
  const response: NextResponse = (await authResponse) ?? NextResponse.next();

  // extract trace-id from instana eum header
  const traceId = request['headers']?.get('x-instana-t') ?? '';
  request['headers']?.set('Server-Timing', `intid;desc=${traceId}`);

  return response;
}

// Stop Middleware running on static files - more performant than ignoreRoutes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    //'/api/graphql',
    '/((?!static|.*\\..*|_next|favicon.ico).*)',
    '/',
  ],
};

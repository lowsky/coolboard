import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

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
  const traceId = request.headers.get('x-instana-t') ?? '';

  const authResponse = await clerkAuthMiddleWare(request, event);
  const response = authResponse ?? NextResponse.next({ request });

  // extract trace-id from instana eum header
  response['headers']?.set('Server-Timing', `intid;desc=${traceId}`);

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
    '/((?!static|.*\\..*|_next|favicon.ico).*)',
    '/',
  ],
};

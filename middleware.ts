import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextMiddleware } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/boards', '/board/(.*)']);

// https://clerk.com/docs/references/nextjs/clerk-middleware
const middleware: NextMiddleware = clerkMiddleware(
  (auth, req) => {
    if (isProtectedRoute(req)) {
      auth().protect();
    }
  },
  {
    debug: false,
  }
);

export default middleware;

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

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import {
  type NextFetchEvent,
  type NextMiddleware,
  type NextRequest,
  NextResponse,
} from 'next/server';

const isProtectedRoute = createRouteMatcher(['/boards', '/board/(.*)']);

// https://clerk.com/docs/references/nextjs/clerk-middleware
const clerkAuthMiddleWare: NextMiddleware = clerkMiddleware(
  (auth, req) => {
    if (isProtectedRoute(req)) {
      auth().protect();
    }
  },
  {
    debug: false,
  }
);

const middleware: NextMiddleware = async (
  request: NextRequest,
  event: NextFetchEvent
) => {
  const traceId = request.headers.get('x-instana-t') ?? '';

  const authResponse = await clerkAuthMiddleWare(request, event);
  const response = authResponse ?? NextResponse.next({ request });

  // extract trace-id from instana eum header
  response['headers']?.set('Server-Timing', `intid;desc=${traceId}`);

  return response;
};

export default middleware;

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

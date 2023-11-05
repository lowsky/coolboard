import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/', '/boards', '/about', '/imprint', '/privacy'],
  debug: false,
});

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

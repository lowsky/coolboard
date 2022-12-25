import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withClerkMiddleware } from '@clerk/nextjs/server';
import { getAuth } from '@clerk/nextjs/server';

export default withClerkMiddleware((req: NextRequest) => {
  // if the user is not signed in redirect them to the sign in page.
  // could be used later, to initiate userId on
  // first loading, or ...:
  const { userId } = getAuth(req);

  console.log('userId', userId)

  return NextResponse.next();
});

// Stop Middleware running on static files
export const config = { matcher: '/((?!.*\\.).*)' };

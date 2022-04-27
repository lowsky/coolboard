import { SignIn } from '@clerk/clerk-react';

export default function SignInPage() {
  // Mount the SignIn component under "/sign-in".
  // The routing is set to path-based.
  return <SignIn routing="path" path="/sign-in" />;
}

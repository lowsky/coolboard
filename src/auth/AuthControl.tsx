import { useUser } from '@auth0/nextjs-auth0';

export const SignedOut = ({ children }) => {
  const { user, isLoading } = useUser();
  return <>{!user && isLoading && children}</>;
};
export const SignedIn = ({ children }) => {
  const { user, isLoading } = useUser();
  return <>{user && !isLoading && children}</>;
};
export const AuthLoading = ({ children }) => {
  const { isLoading } = useUser();
  return <>{isLoading && children}</>;
};

import Auth from './authentication/auth';

export const auth = new Auth();

export const authRefresh = async () => {
  return auth.refresh();
};

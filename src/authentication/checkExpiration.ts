export const isExpired = () => {
  // Check whether the current time is past the
  // access token's expiry time
  const expiresAtStr = localStorage.getItem('expires_at');
  const expiresAt = expiresAtStr ? JSON.parse(expiresAtStr) : null;

  return new Date().getTime() >= expiresAt;
};

export const hasExpirationSet = () => {
  return !!localStorage.getItem('expires_at');
};

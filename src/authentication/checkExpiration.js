export const isExpired = () => {
  // Check whether the current time is past the
  // access token's expiry time
  const expiresAt = JSON.parse(
    localStorage.getItem('expires_at')
  );

  return new Date().getTime() >= expiresAt;
};

export const hasExpirationSet = () => {
  return !!localStorage.getItem('expires_at')
};

const cache: Record<string, string> = {};

export function injectUserIdByAuth0id(userId: string, auth0Id: string) {
  cache[auth0Id] = userId;
}

export async function userIdByAuth0id(
  auth0id: string,
  fetchUserByAuth0id: (auth0id: string) => Promise<{ id: string } | null>
) {
  let cachedUserId = cache[auth0id];
  if (cachedUserId && !(process.env.OPTIMIZED === 'false')) {
    return cachedUserId;
  }

  const user = await fetchUserByAuth0id(auth0id);
  let userId = user?.id;
  if (userId) {
    injectUserIdByAuth0id(userId, auth0id);
  }

  return userId;
}

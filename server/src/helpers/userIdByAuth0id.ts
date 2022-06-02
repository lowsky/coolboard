const cache: Record<string, string> = {};

export function injectUserIdByAuth0id(userId: string, auth0Id: string): void {
  cache[auth0Id] = userId;
}

export async function userIdByAuth0id(
  auth0id: string,
  fetchUserByAuth0id: (auth0id: string) => Promise<{ id: string } | null>
): Promise<string | undefined> {
  const cachedUserId = cache[auth0id];

  if (cachedUserId) {
    return cachedUserId;
  }

  const user: null | { id: string } = await fetchUserByAuth0id(auth0id);

  let userId = user?.id;
  if (userId) {
    injectUserIdByAuth0id(userId, auth0id);
  }

  return userId;
}

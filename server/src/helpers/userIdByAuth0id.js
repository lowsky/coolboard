const cache = {};

export async function injectUserIdByAuth0id(userId, auth0Id) {
  cache[auth0Id] = id;
}

export async function userIdByAuth0id(prisma, auth0Id) {
  let cachedUserId = cache[auth0Id];
  if (cachedUserId) {
    return cachedUserId;
  }

  const { id } = await prisma.query.user({
    where: { auth0Id },
  });

  injectUserIdByAuth0id(id, auth0Id)

  return id;
}

export async function userByAuth0id(prisma, auth0Id) {
  let cachedUserId = cache[auth0Id];
  if (cachedUserId) {
    return cachedUserId;
  }

  const { id } = await prisma.query.user({
    where: { auth0Id },
  });

  injectUserIdByAuth0id(id, auth0Id)

  return id;
}


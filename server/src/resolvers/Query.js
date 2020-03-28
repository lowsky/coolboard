import { verifyAuth0HeaderToken, verifyUserIsAuthenticated } from './utils';
import { injectUserIdByAuth0id } from '../helpers/userIdByAuth0id';
import { createNewUser } from '../helpers/registerNewUser';
import { isLocalDev } from '../helpers/logging';

const Query = {
  async board(parent, { where }, ctx, info) {
    await verifyUserIsAuthenticated(ctx);
    return ctx.db.query.board({ where }, info);
  },

  async list(parent, { where }, ctx, info) {
    await verifyUserIsAuthenticated(ctx);
    return ctx.db.query.list({ where }, info);
  },

  async me(parent, args, ctx, info) {
    const userToken = await verifyAuth0HeaderToken(ctx);

    const auth0id = userToken.sub.split('|')[1];

    const user = await ctx.db.query.user({ where: { auth0id } }, info);
    if (user?.id) {
      injectUserIdByAuth0id(user.id, auth0id);
    }
    if (user) {
      return user
    }

    const u = await createNewUser(ctx.db, userToken)

    if (isLocalDev) console.log('created prisma user:', u)

    if (u?.id) {
      injectUserIdByAuth0id(u.id, auth0id);
    }
    return u;
  },
};

export default Query;

import { verifyAuth0HeaderToken, verifyUserIsAuthenticated } from './utils';
import { injectUserIdByAuth0id } from '../helpers/userIdByAuth0id';

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
    const auth0id = await verifyAuth0HeaderToken(ctx);
    const user = ctx.db.query.user({ where: { auth0id } }, info);
    injectUserIdByAuth0id(user.id, auth0id);
    return user
  },
};

export default Query;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = {
  async signup(parent, args, ctx, info) {
    const password = await bcrypt.hash(
      args.password,
      10
    );
    const user = await ctx.db.mutation.createUser({
      data: { ...args, password },
    });

    const token = jwt.sign(
      { userId: user.id },
      process.env.APP_SECRET
    );
    return {
      token,
      user,
    };
  },

  async login(parent, { email, password }, ctx, info) {
    const users = await ctx.db.query.users({
      where: { email },
    });
    if (!users || users.length !== 1) {
      throw new Error(
        `No such user found for email: ${email}`
      );
    }

    const user = users[0];

    if (!user.password) {
      throw new Error('Sorry, no password based authentication available for this user!');
    }

    const valid = await bcrypt.compare(
      password,
      user.password
    );
    if (!valid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.APP_SECRET
    );

    return {
      token,
      user,
    };
  },
};

module.exports = { auth };

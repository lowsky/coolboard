const getUser = async (req, res, next, db) => {
  if (!req.user) {
    return next();
  }
  try {
    const user = await db.query.user({
      where: { auth0id: req.user.sub.split(`|`)[1] },
    });
    req.user = { token: req.user, ...user };
  }
  catch(e) {
    console.error('Failing to enrich userdata from database:', e);
  }
  next();
};

module.exports = { getUser };

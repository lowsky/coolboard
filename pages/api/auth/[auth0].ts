import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';

export default handleAuth({
  async callback(req, res) {
    console.log('handleAuth - callback, query=', req.query);

    try {
      await handleCallback(req, res, {});
    } catch (error) {
      console.error(error);
      // @ts-ignore
      res.status(error.status || 500).end(error.message);
    }
  },
});

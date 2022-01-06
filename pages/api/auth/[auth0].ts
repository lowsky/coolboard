import auth0 from '../../../src/auth0';

export default auth0.handleAuth({
  async callback(req, res) {
    try {
      await auth0.handleCallback(req, res, {});
    } catch (error) {
      console.error('handleCallback failed:', error);
      res
        // @ts-ignore
        .status(error?.status ?? 500)
        // @ts-ignore
        .end('Authentication failed: ' + error.message);
    }
  },
});

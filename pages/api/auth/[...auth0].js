import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";


const afterCallback = async (req, res, session) => {
  // do some stuff
  // modify the session

  return session;
};

export default handleAuth({

  async callback(req, res) {
    console.log('handleAuth - callback');
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});

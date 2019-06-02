const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const jwks = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 1,
  jwksUri: `https://${
    process.env.AUTH0_DOMAIN
  }/.well-known/jwks.json`,
});



const validateAndParseIdToken = async (idToken) =>
  new Promise((resolve, reject) => {
    const token = jwt.decode(idToken, {
      complete: true,
    });
    console.log('validateAndParseIdToken: token=', token);

    const { header, payload } = token;
    if (!header || !header.kid || !payload) {
      reject(new Error('Invalid Token:', token));
    }

    jwks.getSigningKey(header.kid, (err, key) => {
      console.log('validateAndParse', header);
      console.log('validateAndParse', err);
      console.log('validateAndParse', key);
      if (err) {
          reject(
              new Error(
                  'Error getting signing key: ' + err.message
              )
          );
      }
      jwt.verify(
        idToken,
        key.publicKey,
        { algorithms: ['RS256'] },
        (err, decoded) => {
          if (err) {
              reject('jwt verify error: ' + err.message);
          }
          resolve(decoded);
        }
      );
    });
  });

module.exports = validateAndParseIdToken;

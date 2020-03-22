import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const jwks = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 10,
  jwksUri: `https://${
    process.env.AUTH0_DOMAIN
  }/.well-known/jwks.json`,
});

const validateAndParseIdToken = async idToken =>
  new Promise((resolve, reject) => {
    const token = jwt.decode(idToken, {
      complete: true,
    });

    const { header, payload } = token;
    if (!header || !header.kid || !payload) {
      reject(new Error('Invalid Token:', token));
    }

    jwks.getSigningKey(header.kid, (err, key) => {
      if (err) {
        reject(
          new Error(
            'Error getting signing key: ' + err.message
          )
        );
      }
      if (!key) {
        reject(
          new Error(
            'Error getting signing key: "No public key info available"'
          )
        );
        return;
      }
      jwt.verify(
        idToken,
        key.publicKey,
        { algorithms: ['RS256'] },
        (err, decoded) => {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(decoded);
        }
      );
    });
  });

export default validateAndParseIdToken

import jwt, { JwtPayload } from 'jsonwebtoken';
import jwksClient, { SigningKey } from 'jwks-rsa';

const jwks = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 10,
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

const validateAndParseIdToken = async (idToken: string) => {
  const token = jwt.decode(idToken, {
    complete: true,
  });

  if (!token) {
    throw new Error('Invalid Token!');
  }

  const { header, payload } = token;
  if (!header || !header.kid || !payload) {
    throw new Error('Invalid Token: ' + token);
  }

  let key: SigningKey;

  try {
    key = await jwks.getSigningKey(header.kid);
  } catch (err) {
    throw new Error('Error getting signing key: ' + err);
  }

  if (!key) {
    throw new Error(
      'Error getting signing key: "No public key info available"'
    );
  }
  if (!key || !('publicKey' in key)) {
    throw new Error(
      'Error getting signing key: "No public key info available"'
    );
  }

  try {
    return jwt.verify(idToken, key.publicKey, {
      algorithms: ['RS256'],
    }) as JwtPayload;
  } catch (err) {
    throw new Error('Error verifying token: ' + err);
  }
};

export default validateAndParseIdToken;

import jwt from 'jsonwebtoken';


export function generateAccessToken(user) {
  const id = user.id;

  const expiresIn = '1d';

  const payload = {
    sub: id,
    iat: Date.now()
  }

  const signedToken = jwt.sign(payload, process.env.PRIVATE_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn
  };
}

export function validateAccessToken(token) {
  const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;

  try {
    return jwt.verify(token, jwtAccessSecret);
  } catch (error) {
    return null;
  }
}

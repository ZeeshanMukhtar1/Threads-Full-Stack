import jwt from 'jsonwebtoken';
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });

  res.cookie('jwt', token, {
    httpOnly: true, // this will make sure that the cookie is not accessible via client-side JavaScript
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    sameSite: 'strict', // 'strict' will ensure that the cookie is sent with cross-site requests only if the request is initiated from the same domain
  });
  return token;
};

export default generateTokenAndSetCookie;

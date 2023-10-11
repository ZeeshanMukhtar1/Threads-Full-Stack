import jwt from 'jsonwebtoken';
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });

  res.cookie('jwt', token, {
    httpOnly: true, // The cookie only accessible by the web server
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    sameSite: 'strict', // 'strict' will ensure that the cookie is sent with cross-site requests only if the request is initiated from the same domain
  });
  return token;
};

export default generateTokenAndSetCookie;

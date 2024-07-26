import jwt from 'jsonwebtoken';

const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
      return res.status(401).json({ message: 'Unauthorized' });
  }
  jwt.verify(token, 'abcdefghijklmnopqrstuv', (err: any, user: any) => {
      if (err) {
          return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
  });
}

const getIDFromToken = (token: string) => {
    return jwt.verify(token, 'abcdefghijklmnopqrstuv') as jwt.JwtPayload;
}


export default { authenticateToken, getIDFromToken}
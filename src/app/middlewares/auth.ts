import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.json';

interface userRequest extends Request {
  userId: string;
}

//This middleware won't allow any request that use him if token is invalid, token will be checked before every request made
const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  try {
    //Get Header from request
    const authHeader = <string>req.headers.authorization;

    //If there's none, there's no token provided
    if (!authHeader)
      return res.status(401).send({ message: 'Token não encontrado' });

    //Split header due to "Bearer " that comes before the actual token
    const parts = authHeader.split(' ');

    const [scheme, token] = parts;

    //Check if Bearer is correctly formatted
    if (!/^Bearer$/i.test(scheme))
      return res.status(401).send({ message: 'Header mal formatado' });

    //Compares both tokens, if equal, allow the request to keep going
    jwt.verify(token, authConfig.secret, async (err, decoded: any) => {
      if (err) {
        return res.status(401).send({ message: 'Token Inválido' });
      }

      req.userId = decoded.id;
      return next();
    });
  } catch (error) {
    if (error.code == 10000)
      return res.status(400).send({ message: error.name });
    return res.status(500).send({ message: 'Erro ao verificar token' });
  }
};

export default authMiddleware;

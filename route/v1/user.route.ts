import { Router } from 'express';
import authcontroller from '../../controllers/v1/auth.controller';
import { celebrate } from 'celebrate';
import authValidation from '../../validations/v1/auth.validation';
import authenticateToken from '../../helper/jwt.helper';

  const userRouter = Router();
  
  userRouter.post('/login', authcontroller.login);
  userRouter.post('/register', authcontroller.register);
  userRouter.get('/', authenticateToken.authenticateToken, authcontroller.getById);
  userRouter.get('/refresh_token/:refreshToken', authcontroller.getAccesstoken);

export default userRouter;
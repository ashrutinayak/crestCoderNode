import { Router } from 'express';
import { celebrate } from 'celebrate';
import authenticateToken from '../../helper/jwt.helper';
import orderController from '../../controllers/v1/order.controller';

  const productRoute = Router();
  
  productRoute.post('/', authenticateToken.authenticateToken, orderController.addOder);
  productRoute.get('/', authenticateToken.authenticateToken, orderController.getAllOrder);


export default productRoute;
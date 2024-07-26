import { Router } from 'express';
import { celebrate } from 'celebrate';
import authenticateToken from '../../helper/jwt.helper';
import productController from '../../controllers/v1/product.controller';
import upload from '../../config/multer.config';

  const productRoute = Router();
  
  productRoute.post('/', authenticateToken.authenticateToken, upload.single('image'), productController.addProduct);
  productRoute.get('/', productController.getProduct);
  productRoute.put('/:id', authenticateToken.authenticateToken, upload.single('image') , productController.updateProduct);
  productRoute.delete('/:id',authenticateToken.authenticateToken, productController.deleteProduct);
  productRoute.get('/:id',productController.getById);

export default productRoute;
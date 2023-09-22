import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';
import ProductController from '../controllers/productController.js';

//user 
router.post('/user/register',UserController.userRegister);
router.post('/user/login',UserController.userLogin);

// //product
router.post('/product/add',ProductController.addProduct);
router.get('/product/get',ProductController.getProducts);
router.get('/product/getById/:id',ProductController.getProductById);
router.put('/product/update/:id',ProductController.updateProductById);
router.delete('/product/deleleAll',ProductController.deleteProducts);
router.delete('/product/deleleById/:id',ProductController.deleteProductById);

export default router;
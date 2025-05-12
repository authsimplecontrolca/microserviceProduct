import { Router } from 'express';
import { allValidator } from '../utils/expressValidator';
import { createProductValidator, filterProductsValidator, idProductAndUpdatedByValidation, idProductValidation, updateProductValidator } from '../middleware/validations';
import { createProductController, getAllProductsController, getProductByIdController, toggleProductStatusController, updateProductController } from '../controllers/controllers';

export const router: Router = Router();

// Crear un nuevo producto
router.post('/create', createProductValidator, allValidator, createProductController);

// Obtener un producto por ID
router.get('/find/:id', idProductValidation, allValidator, getProductByIdController);

// Obtener todos los productos con filtros
router.get('/all', filterProductsValidator, allValidator, getAllProductsController);

// Actualizar un producto por ID
router.put('/update/:id', idProductValidation, updateProductValidator, allValidator, updateProductController);

// Eliminar un producto por ID
router.put('/toggle/:id/updatedBy/:updatedBy', idProductAndUpdatedByValidation, allValidator, toggleProductStatusController);

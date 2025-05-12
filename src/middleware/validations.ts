import { body, param } from 'express-validator';
import {
  brandIdOptionalValidation,
  brandIdValidation,
  categoryIdOptionalValidation,
  categoryIdValidation,
  colorIdOptionalValidation,
  colorIdValidation,
  materialIdOptionalValidation,
  materialIdValidation,
  productIdValidation,
  sizeIdOptionalValidation,
  sizeIdValidation,
} from './findInfo';

export const createProductValidator = [
  // Validación de `nameProduct`
  body('productName')
    .isString()
    .withMessage('El nombre del producto debe ser una cadena de texto.')
    .notEmpty()
    .withMessage('El nombre del producto no puede estar vacío.')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre del producto debe tener entre 2 y 100 caracteres.')
    .bail(),

  // Validación de `description`
  body('description')
    .optional()
    .isString()
    .withMessage('La descripción del producto debe ser una cadena de texto.')
    .notEmpty()
    .withMessage('La descripción no puede estar vacía.')
    .isLength({ min: 1, max: 500 })
    .withMessage('La descripción debe tener entre 1 y 500 caracteres.')
    .bail(),

  // Validación de `basePrice`
  body('basePrice')
    .isFloat({ min: 0 })
    .withMessage('El precio base debe ser un número mayor o igual a 0.')
    .notEmpty()
    .withMessage('El precio base no puede estar vacío.')
    .bail(),

  // Validación de `stock`
  body('stock')
    .isInt({ min: 0 })
    .withMessage('La cantidad de stock debe ser un número entero mayor o igual a 0.')
    .notEmpty()
    .withMessage('La cantidad de stock no puede estar vacía.')
    .bail(),

  // Validación de `categoryId`
  ...categoryIdValidation,

  // Validación de `materialId`
  ...materialIdValidation,

  // Validación de `colorId`
  ...colorIdValidation,

  // Validación de `sizeId`
  ...sizeIdValidation,

  // Validación de `brandId`
  ...brandIdValidation,

  // Validación de `literage`
  body('literage')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El litraje debe ser un número mayor o igual a 0.')
    .bail(),

  // Validación de `sizeInCm`
  body('sizeInCm')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El tamaño en centímetros debe ser un número mayor o igual a 0.')
    .bail(),

  // Validación de `qualityLevel`
  body('qualityLevel')
    .isInt({ min: 1, max: 5 })
    .withMessage('El nivel de calidad debe ser un número entero entre 1 y 5.')
    .bail(),

  // Validación de `companyId`
  body('companyId')
    .isInt({ min: 1 })
    .withMessage('El ID de la empresa debe ser un número entero mayor que 0.')
    .notEmpty()
    .withMessage('El ID de la empresa no puede estar vacío.')
    .bail(),

  // Validación de `createdBy`
  body('createdBy')
    .isInt({ min: 1 })
    .withMessage('El ID del creador debe ser un número entero mayor que 0.')
    .notEmpty()
    .withMessage('El ID del creador no puede estar vacío.')
    .bail(),
];

export const updateProductValidator = [
  // Validación de `nameProduct`
  body('productName')
    .optional() // Solo se valida si se proporciona
    .isString()
    .withMessage('El nombre del producto debe ser una cadena de texto.')
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre del producto debe tener entre 3 y 100 caracteres.')
    .bail(),

  // Validación de `description`
  body('description')
    .optional() // Solo se valida si se proporciona
    .isString()
    .withMessage('La descripción del producto debe ser una cadena de texto.')
    .isLength({ min: 10, max: 500 })
    .withMessage('La descripción debe tener entre 10 y 500 caracteres.')
    .bail(),

  // Validación de `basePrice`
  body('basePrice')
    .optional() // Solo se valida si se proporciona
    .isFloat({ min: 0 })
    .withMessage('El precio base debe ser un número mayor o igual a 0.')
    .bail(),

  // Validación de `stock`
  body('stock')
    .optional() // Solo se valida si se proporciona
    .isInt({ min: 0 })
    .withMessage('La cantidad de stock debe ser un número entero mayor o igual a 0.')
    .bail(),

  // Validación de `categoryId`
  ...categoryIdOptionalValidation,

  // Validación de `materialId`
  ...materialIdOptionalValidation,

  // Validación de `colorId`
  ...colorIdOptionalValidation,

  // Validación de `sizeId`
  ...sizeIdOptionalValidation,

  // Validación de `brandId`
  ...brandIdOptionalValidation,

  // Validación de `literage`
  body('literage')
    .optional() // Solo se valida si se proporciona
    .isFloat({ min: 0 })
    .withMessage('El litraje debe ser un número mayor o igual a 0.')
    .bail(),

  // Validación de `sizeInCm`
  body('sizeInCm')
    .optional() // Solo se valida si se proporciona
    .isFloat({ min: 0 })
    .withMessage('El tamaño en centímetros debe ser un número mayor o igual a 0.')
    .bail(),

  // Validación de `qualityLevel`
  body('qualityLevel')
    .optional() // Solo se valida si se proporciona
    .isInt({ min: 1, max: 5 })
    .withMessage('El nivel de calidad debe ser un número entero entre 1 y 5.')
    .bail(),

  // Validación de `updatedBy`
  body('updatedBy').isInt({ min: 1 }).withMessage("El campo 'updatedBy' debe ser un número entero mayor que 0.").bail(),
];

export const filterProductsValidator = [
  // Validación de `categoryId`
  body('categoryId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El ID de la categoría del producto debe ser un número entero válido.')
    .bail(),

  // Validación de `materialId`
  body('materialId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El ID del material del producto debe ser un número entero válido.')
    .bail(),

  // Validación de `colorId`
  body('colorId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El ID del color del producto debe ser un número entero válido.')
    .bail(),

  // Validación de `sizeId`
  body('sizeId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El ID de la talla del producto debe ser un número entero válido.')
    .bail(),

  // Validación de `brandId`
  body('brandId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El ID de la marca del producto debe ser un número entero válido.')
    .bail(),

  // Validación del parámetro de búsqueda
  body('search')
    .optional()
    .isString()
    .withMessage('El parámetro de búsqueda debe ser una palabra o frase.')
    .isLength({ min: 1, max: 100 })
    .withMessage('El texto de búsqueda debe tener entre 1 y 100 caracteres.')
    .bail(),

  // Validación del `order`
  body('order')
    .optional()
    .isIn(['DESC', 'ASC'])
    .withMessage("El parámetro 'order' solo puede ser 'ASC' o 'DESC'.")
    .bail(),

  // Validación del `limit`
  body('limit')
    .optional()
    .isInt({ min: 1 })
    .withMessage("El parámetro 'limit' debe ser un número entero mayor o igual a 1.")
    .bail(),

  // Validación del `page`
  body('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage("El parámetro 'page' debe ser un número entero mayor o igual a 1.")
    .bail(),

  body('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El precio mínimo debe ser un número mayor o igual a 0.')
    .bail(),

  // Validación de `maxPrice`
  body('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El precio máximo debe ser un número mayor o igual a 0.')
    .bail(),

  // Comprobación de que `minPrice` no sea mayor que `maxPrice`
  body('minPrice')
    .custom((value, { req }) => {
      if (value !== undefined && req.body.maxPrice !== undefined && value > req.body.maxPrice) {
        throw new Error('El precio mínimo no puede ser mayor que el precio máximo.');
      }
      return true;
    })
    .bail(),
];
export const idProductValidation = [...productIdValidation];
export const idProductAndUpdatedByValidation = [
  ...productIdValidation,
  param('updatedBy').isNumeric().withMessage('El ID del usuario que actualiza debe ser un número.'),
];

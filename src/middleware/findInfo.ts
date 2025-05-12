import { body, param } from "express-validator";
import { CategoryProduct } from "../models/categoryProduct";
import { Material } from "../models/material";
import { Color } from "../models/color";
import { Size } from "../models/size";
import { Brand } from "../models/brand";
import { Product } from "../models/product";


export const productIdValidation = [
    param('id')
      .isNumeric()
      .withMessage('El ID del producto debe ser un número')
      .custom(async (id) => {
        const product = await Product.findByPk(id);
        if (!product) {
          throw new Error(`El producto con el ID ${id} no se encuentra.`);
        }
      })
      .bail(),
  ];

// Valida que la categoría del producto exista.
export const categoryIdValidation = [
    body('categoryId')
      .isNumeric()
      .withMessage('El ID de la categoría debe ser un número')
      .custom(async (categoryId) => {
        const category = await CategoryProduct.findByPk(categoryId);
        if (!category) {
          throw new Error(`La categoría con el ID ${categoryId} no se encuentra.`);
        }
      })
      .bail(),
  ];
  
  // Valida que el material del producto exista.
  export const materialIdValidation = [
    body('materialId')
      .isNumeric()
      .withMessage('El ID del material debe ser un número')
      .custom(async (materialId) => {
        const material = await Material.findByPk(materialId);
        if (!material) {
          throw new Error(`El material con el ID ${materialId} no se encuentra.`);
        }
      })
      .bail(),
  ];
  
  // Valida que el color del producto exista.
  export const colorIdValidation = [
    body('colorId')
      .isNumeric()
      .withMessage('El ID del color debe ser un número')
      .custom(async (colorId) => {
        const color = await Color.findByPk(colorId);
        if (!color) {
          throw new Error(`El color con el ID ${colorId} no se encuentra.`);
        }
      })
      .bail(),
  ];
  
  // Valida que la talla del producto exista.
  export const sizeIdValidation = [
    body('sizeId')
      .isNumeric()
      .withMessage('El ID de la talla debe ser un número')
      .custom(async (sizeId) => {
        const size = await Size.findByPk(sizeId);
        if (!size) {
          throw new Error(`La talla con el ID ${sizeId} no se encuentra.`);
        }
      })
      .bail(),
  ];
  
  // Valida que la marca del producto exista.
  export const brandIdValidation = [
    body('brandId')
      .isNumeric()
      .withMessage('El ID de la marca debe ser un número')
      .custom(async (brandId) => {
        const brand = await Brand.findByPk(brandId);
        if (!brand) {
          throw new Error(`La marca con el ID ${brandId} no se encuentra.`);
        }
      })
      .bail(),
  ];
  
  // Valida que la categoría del producto exista (para actualizaciones).
export const categoryIdOptionalValidation = [
    body('categoryId')
      .optional()
      .isNumeric()
      .withMessage('El ID de la categoría debe ser un número')
      .custom(async (categoryId) => {
        const category = await CategoryProduct.findByPk(categoryId);
        if (categoryId && !category) {
          throw new Error(`La categoría con el ID ${categoryId} no se encuentra.`);
        }
      })
      .bail(),
  ];
  
  // Valida que el material del producto exista (para actualizaciones).
  export const materialIdOptionalValidation = [
    body('materialId')
      .optional()
      .isNumeric()
      .withMessage('El ID del material debe ser un número')
      .custom(async (materialId) => {
        const material = await Material.findByPk(materialId);
        if (materialId && !material) {
          throw new Error(`El material con el ID ${materialId} no se encuentra.`);
        }
      })
      .bail(),
  ];
  
  // Valida que el color del producto exista (para actualizaciones).
  export const colorIdOptionalValidation = [
    body('colorId')
      .optional()
      .isNumeric()
      .withMessage('El ID del color debe ser un número')
      .custom(async (colorId) => {
        const color = await Color.findByPk(colorId);
        if (colorId && !color) {
          throw new Error(`El color con el ID ${colorId} no se encuentra.`);
        }
      })
      .bail(),
  ];
  
  // Valida que la talla del producto exista (para actualizaciones).
  export const sizeIdOptionalValidation = [
    body('sizeId')
      .optional()
      .isNumeric()
      .withMessage('El ID de la talla debe ser un número')
      .custom(async (sizeId) => {
        const size = await Size.findByPk(sizeId);
        if (sizeId && !size) {
          throw new Error(`La talla con el ID ${sizeId} no se encuentra.`);
        }
      })
      .bail(),
  ];
  
  // Valida que la marca del producto exista (para actualizaciones).
  export const brandIdOptionalValidation = [
    body('brandId')
      .optional()
      .isNumeric()
      .withMessage('El ID de la marca debe ser un número')
      .custom(async (brandId) => {
        const brand = await Brand.findByPk(brandId);
        if (brandId && !brand) {
          throw new Error(`La marca con el ID ${brandId} no se encuentra.`);
        }
      })
      .bail(),
  ];
  
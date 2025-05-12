import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { errorResponse, successResponse } from '../utils/bodyResponseApi';
import { getAllProductsService, getProductByIdService } from '../services/find/find';
import { createProductService } from '../services/create/create';
import { toggleProductStatusService, updateProductService } from '../services/update/update';
import { ProductCreationAttributes } from '../models/product';

const SUCCESS_MESSAGES = {
  productsList: 'Listado de productos encontrados',
  productFound: (id: string) => `Resultado de la búsqueda con el ID ${id}`,
  productCreated: 'Producto creado con éxito',
  productUpdated: 'Producto actualizado correctamente',
  productNoUpdated: 'Producto no actualizado, no hubo cambios',
  productStatusToggled: 'Estado del producto actualizado correctamente',
  productStatusToggledError: 'Estado del producto no se actualizar',
};

export const getAllProductsController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const listProducts = await getAllProductsService(req.body);
  res.status(200).json(successResponse({ message: SUCCESS_MESSAGES.productsList, data: listProducts }));
});

export const getProductByIdController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const product = await getProductByIdService({ id: Number(id) });
  res.status(200).json(successResponse({ message: SUCCESS_MESSAGES.productFound(id), data: product }));
});

export const createProductController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const {
    productName,
    description,
    basePrice,
    stock,
    categoryId,
    materialId,
    colorId,
    sizeId,
    brandId,
    companyId,
    sizeInCm,
    qualityLevel,
    literage,
    createdBy,
  } = req.body;

  const productData: ProductCreationAttributes = {
    productName: String(productName),
    description: String(description),
    basePrice: Number(basePrice),
    stock: Number(stock),
    categoryId: Number(categoryId),
    materialId: Number(materialId),
    colorId: Number(colorId),
    sizeId: Number(sizeId),
    brandId: Number(brandId),
    companyId: Number(companyId),
    createdBy: Number(createdBy),
    sizeInCm: Number(sizeInCm),
    qualityLevel: Number(qualityLevel),
    literage: Number(literage),
  };

  const newProduct = await createProductService(productData);
  res.status(201).json(successResponse({ message: SUCCESS_MESSAGES.productCreated, data: newProduct }));
});

export const updateProductController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const {
    productName,
    description,
    basePrice,
    stock,
    categoryId,
    materialId,
    colorId,
    sizeId,
    brandId,
    updatedBy,
    sizeInCm,
    qualityLevel,
    literage,
  } = req.body;

  // Creamos un objeto `payload` que almacenará solo los campos que son proporcionados
  const payload: any = { id: Number(id), updatedBy: Number(updatedBy) };

  // Solo agregamos a `payload` los campos que se envían en la solicitud
  if (productName) payload.productName = String(productName);
  if (description) payload.description = String(description);
  if (basePrice) payload.basePrice = Number(basePrice);
  if (stock) payload.stock = Number(stock);
  if (categoryId) payload.categoryId = Number(categoryId);
  if (materialId) payload.materialId = Number(materialId);
  if (colorId) payload.colorId = Number(colorId);
  if (sizeId) payload.sizeId = Number(sizeId);
  if (brandId) payload.brandId = Number(brandId);
  if (sizeInCm) payload.sizeInCm = Number(sizeInCm);
  if (qualityLevel) payload.qualityLevel = Number(qualityLevel);
  if (literage) payload.literage = Number(literage);

  // Llamamos al servicio para actualizar el producto
  const wasUpdated = await updateProductService(payload);

  // Si no se logró actualizar el producto, enviamos una respuesta de error
  if (!wasUpdated) {
    res.status(400).json(errorResponse({ message: SUCCESS_MESSAGES.productNoUpdated }));
    return;
  }

  // Si todo fue correcto, enviamos una respuesta de éxito
  res.status(200).json(successResponse({ message: SUCCESS_MESSAGES.productUpdated }));
});

export const toggleProductStatusController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id, updatedBy } = req.params;
  
  const isUpdated = await toggleProductStatusService({ id: Number(id), updatedBy: Number(updatedBy) });

  if (!isUpdated) {
    res.status(400).json(errorResponse({ message: SUCCESS_MESSAGES.productStatusToggledError }));
    return;
  }
  res.status(200).json(successResponse({ message: SUCCESS_MESSAGES.productStatusToggled }));
});

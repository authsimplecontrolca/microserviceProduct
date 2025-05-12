import { Product, ProductCreationAttributes } from '../../models/product';

// Función para crear un nuevo producto
export const createProductService = async (productData: ProductCreationAttributes): Promise<Product> => {
  try {
    return await Product.create(productData);
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear el producto en la base de datos.');
  }
};

import { Product } from '../../models/product';

export const updateProductService = async (payload: {
  id: number;
  productName?: string;
  description?: string;
  basePrice?: number;
  stock?: number;
  categoryId?: number;
  materialId?: number;
  colorId?: number;
  sizeId?: number;
  brandId?: number;
  updatedBy?: number;
  sizeInCm?: number;
  qualityLevel?: number;
  literage?: number;
}) => {
  try {
    const [affectedRows] = await Product.update(payload, { where: { id: payload.id } });

    if (affectedRows === 0) return false;

    return true;
  } catch (error: any) {
    throw new Error('Error al actualizar el producto: ' + error.message);
  }
};

export const toggleProductStatusService = async ({ id, updatedBy }: { id: number; updatedBy: number }) => {
  try {
    // Buscar el producto por su ID
    const product = await Product.findByPk(id);


    // Actualizamos el estado del producto
    const [affectedRows] = await Product.update({ isActive: !product!.isActive, updatedBy }, { where: { id } });

    // Verificar si se afectaron filas (si es mayor que 0, la actualización fue exitosa)
    if (affectedRows === 0) return false;

    return true;
  } catch (error: any) {
    throw new Error('Error al invertir el estado del producto: ' + error.message);
  }
};

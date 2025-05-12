import { Product } from '../../models/product';
import { QueryTypes } from 'sequelize';

export const getAllProductsService = async ({
  search,
  categoryId,
  minPrice,
  maxPrice,
  colorId,
  sizeId,
  materialId,
  brandId,
  page = 1,
  limit = 10,
  order = 'DESC',
}: {
  search: string;
  categoryId: number;
  minPrice: number;
  maxPrice: number;
  colorId?: number; // Filtro opcional de color
  sizeId?: number; // Filtro opcional de tamaño
  materialId?: number; // Filtro opcional de material
  brandId?: number; // Filtro opcional de marca
  page?: number;
  limit?: number;
  order?: string;
}) => {
  try {
    const offset = (page - 1) * limit;

    // Ajustar la consulta SQL para buscar en todos los campos relevantes y filtrar solo productos activos
    const query = `
      SELECT 
        p.id, 
        p.productName, 
        p.description, 
        p.basePrice, 
        p.stock, 
        p.categoryId, 
        ctg.id AS categoryId,
        ctg.categoryName,
        p.colorId, 
        clr.colorName, 
        p.sizeId, 
        sz.sizeName,
        p.materialId, 
        mat.materialName,
        p.brandId, 
        brd.brandName,
        p.literage,
        p.sizeInCm,
        p.qualityLevel
      FROM products as p
      INNER JOIN category_products AS ctg ON p.categoryId = ctg.id
      LEFT JOIN colors AS clr ON p.colorId = clr.id
      LEFT JOIN sizes AS sz ON p.sizeId = sz.id
      LEFT JOIN materials AS mat ON p.materialId = mat.id
      LEFT JOIN brands AS brd ON p.brandId = brd.id
      WHERE (:search IS NULL OR 
        p.productName LIKE :search OR 
        p.description LIKE :search OR 
        clr.colorName LIKE :search OR 
        sz.sizeName LIKE :search OR 
        mat.materialName LIKE :search OR 
        brd.brandName LIKE :search)
      AND (:categoryId IS NULL OR p.categoryId = :categoryId)

      AND (:minPrice IS NULL OR p.basePrice >= :minPrice)
      AND (:maxPrice IS NULL OR p.basePrice <= :maxPrice)
      
      AND (:colorId IS NULL OR p.colorId = :colorId)  -- Filtro de color
      AND (:sizeId IS NULL OR p.sizeId = :sizeId)  -- Filtro de tamaño
      AND (:materialId IS NULL OR p.materialId = :materialId)  -- Filtro de material
      AND (:brandId IS NULL OR p.brandId = :brandId)  -- Filtro de marca
      AND p.isActive = 1  -- Filtro de estado activo
      ORDER BY p.id ${order} LIMIT :limit OFFSET :offset
    `;

    const replacements = {
      search: search ? `%${search}%` : null,
      categoryId: categoryId || null,
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
      colorId: colorId || null,
      sizeId: sizeId || null,
      materialId: materialId || null,
      brandId: brandId || null,
      limit: limit,
      offset: offset,
    };

    const products = await Product.sequelize?.query(query, {
      replacements,
      type: QueryTypes.SELECT,
    });

    const countQuery = `
      SELECT COUNT(*) AS total
      FROM products as p
      INNER JOIN category_products AS ctg ON p.categoryId = ctg.id
      LEFT JOIN colors AS clr ON p.colorId = clr.id
      LEFT JOIN sizes AS sz ON p.sizeId = sz.id
      LEFT JOIN materials AS mat ON p.materialId = mat.id
      LEFT JOIN brands AS brd ON p.brandId = brd.id
      WHERE (:search IS NULL OR 
        p.productName LIKE :search OR 
        p.description LIKE :search OR 
        clr.colorName LIKE :search OR 
        sz.sizeName LIKE :search OR 
        mat.materialName LIKE :search OR 
        brd.brandName LIKE :search)
      AND (:categoryId IS NULL OR p.categoryId = :categoryId)
      AND (:minPrice IS NULL OR p.basePrice >= :minPrice)
      AND (:maxPrice IS NULL OR p.basePrice <= :maxPrice)
      AND (:colorId IS NULL OR p.colorId = :colorId)
      AND (:sizeId IS NULL OR p.sizeId = :sizeId)
      AND (:materialId IS NULL OR p.materialId = :materialId)
      AND (:brandId IS NULL OR p.brandId = :brandId)
      AND p.isActive = 1
    `;

    const totalResult: any = await Product.sequelize?.query(countQuery, {
      replacements,
      type: QueryTypes.SELECT,
    });

    const totalProducts = totalResult && totalResult[0] ? totalResult[0].total : 0;

    return {
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      perPage: limit,
    };
  } catch (error: any) {
    throw new Error('Error al obtener los productos: ' + error.message);
  }
};

export const getProductByIdService = async ({ id }: { id: number }) => {
  try {
    const query = `
      SELECT 
        p.id, 
        p.productName, 
        p.description, 
        p.basePrice, 
        p.stock, 
        p.categoryId, 
        ctg.id AS categoryId,
        ctg.categoryName,
        p.colorId, 
        clr.colorName, 
        p.sizeId, 
        sz.sizeName,
        p.materialId, 
        mat.materialName,
        p.brandId, 
        brd.brandName,
        p.literage,
        p.sizeInCm,
        p.qualityLevel
      FROM products as p
      INNER JOIN category_products AS ctg ON p.categoryId = ctg.id
      LEFT JOIN colors AS clr ON p.colorId = clr.id
      LEFT JOIN sizes AS sz ON p.sizeId = sz.id
      LEFT JOIN materials AS mat ON p.materialId = mat.id
      LEFT JOIN brands AS brd ON p.brandId = brd.id
      WHERE p.id = :id
    `;

    const product = await Product.sequelize?.query(query, {
      replacements: { id },
      type: QueryTypes.SELECT,
    });

    return product![0];
  } catch (error: any) {
    throw new Error('Error al obtener el producto: ' + error.message);
  }
};

// models/categoryProduct.ts
import { Table, Column, Model, DataType, AllowNull, Unique, Default } from 'sequelize-typescript';

@Table({ tableName: 'category_products', timestamps: true })
export class CategoryProduct extends Model<CategoryProduct> {
  @AllowNull(false)
  @Unique('categoryName')
  @Column(DataType.STRING)
  categoryName!: string; // Nombre de la categoría de empresa (Ej. Tecnología, Alimentación)

  @Column(DataType.STRING)
  description?: string; // Descripción  (opcional)

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive!: boolean; // Indica si está activa

  @AllowNull(false)
  @Column(DataType.INTEGER)
  companyId!: number; // Identificador de la empresa
}

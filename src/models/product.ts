import { Table, Column, Model, DataType, AllowNull, ForeignKey, BelongsTo, Default, Validate } from 'sequelize-typescript';
import { Brand, CategoryProduct, Color, Material, Size } from './';

export interface ProductCreationAttributes {
  productName: string;
  description?: string;
  basePrice: number;
  stock: number;
  categoryId: number;
  materialId?: number;
  colorId?: number;
  sizeId?: number;
  brandId?: number;
  literage?: number;
  sizeInCm?: number;
  qualityLevel: number;
  companyId: number;
  createdBy: number;
  updatedBy?: number;
}
@Table({ tableName: 'products', timestamps: true })
export class Product extends Model<Product, ProductCreationAttributes> {
  @AllowNull(false)
  @Column(DataType.STRING)
  productName!: string;

  @Column(DataType.STRING)
  description?: string;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  basePrice!: number;

  @AllowNull(false)
  @Column(DataType.BIGINT)
  stock!: number;

  @ForeignKey(() => CategoryProduct)
  @Column(DataType.INTEGER)
  categoryId!: number;

  @BelongsTo(() => CategoryProduct)
  category?: CategoryProduct;

  @ForeignKey(() => Brand)
  @Column(DataType.INTEGER)
  brandId?: number;

  @BelongsTo(() => Brand)
  brand?: Brand;

  @ForeignKey(() => Color)
  @Column(DataType.INTEGER)
  colorId?: number;

  @BelongsTo(() => Color)
  color?: Color;

  @ForeignKey(() => Material)
  @Column(DataType.INTEGER)
  materialId?: number;

  @BelongsTo(() => Material)
  material?: Material;

  @ForeignKey(() => Size)
  @Column(DataType.INTEGER)
  sizeId?: number;

  @BelongsTo(() => Size)
  size?: Size;

  @Column(DataType.FLOAT)
  literage?: number;

  @Column(DataType.FLOAT)
  sizeInCm?: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  // @Validate({ min: 1, max: 5 })
  qualityLevel!: number;

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive!: boolean;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  companyId!: number;

  @Column(DataType.INTEGER)
  createdBy!: number;

  @Column(DataType.INTEGER)
  updatedBy?: number;
}

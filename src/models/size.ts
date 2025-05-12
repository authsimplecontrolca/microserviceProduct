import { Table, Column, Model, DataType, AllowNull, Default } from 'sequelize-typescript';

@Table({ tableName: 'sizes', timestamps: true })
export class Size extends Model<Size> {

  @AllowNull(false)
  @Column(DataType.STRING)
  sizeName!: string; // Talla del producto (S, M, L, XL, etc.)

  @Column(DataType.STRING)
  description?: string; // Descripción de la talla (opcional)

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive!: boolean; // Indica si está activa

  @AllowNull(false)
  @Column(DataType.INTEGER)
  companyId!: number; // Identificador de la empresa
}

import { Table, Column, Model, DataType, AllowNull, Default } from 'sequelize-typescript';

@Table({ tableName: 'brands', timestamps: true })
export class Brand extends Model<Brand> {
  @AllowNull(false)
  @Column(DataType.STRING)
  brandName!: string; // Nombre de la marca (Nike, Adidas, etc.)

  @Column(DataType.STRING)
  description?: string; // Descripción de la marca (opcional)

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive!: boolean; // Indica si está activa

  @AllowNull(false)
  @Column(DataType.INTEGER)
  companyId!: number; // Identificador de la empresa
}

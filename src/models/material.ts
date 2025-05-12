import { Table, Column, Model, DataType, AllowNull, Default } from 'sequelize-typescript';

@Table({ tableName: 'materials', timestamps: true })
export class Material extends Model<Material> {

  @AllowNull(false)
  @Column(DataType.STRING)
  materialName!: string; // Nombre del material (Algodón, Poliéster, etc.)

  @Column(DataType.STRING)
  description?: string; // Descripción del material (opcional)

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive!: boolean; // Indica si está activa

  @AllowNull(false)
  @Column(DataType.INTEGER)
  companyId!: number; // Identificador de la empresa
}

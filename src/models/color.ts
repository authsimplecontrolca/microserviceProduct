import { Table, Column, Model, DataType, AllowNull, Default } from 'sequelize-typescript';

@Table({ tableName: 'colors', timestamps: true })
export class Color extends Model<Color> {

  @AllowNull(false)
  @Column(DataType.STRING)
  colorName!: string; // Nombre del color (Rojo, Azul, etc.)

  @Column(DataType.STRING)
  description?: string; // Descripción del color (opcional)

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive!: boolean; // Indica si está activa

  @AllowNull(false)
  @Column(DataType.INTEGER)
  companyId!: number; // Identificador de la empresa
}

import { Sequelize } from 'sequelize-typescript';
import { Brand, CategoryProduct, Color, Material, Product, Size } from '../models';
import { activeModels } from './activeModel';

const models: any[] = [];

// Solo agrega los modelos que están activos en activeModels

if (activeModels.CategoryProduct === 'on') models.push(CategoryProduct);
if (activeModels.Product === 'on') models.push(Product);
if (activeModels.Color === 'on') models.push(Color);
if (activeModels.Material === 'on') models.push(Material);
if (activeModels.Size === 'on') models.push(Size);
if (activeModels.Brand === 'on') models.push(Brand);
// Agrega más modelos aquí si es necesario

export const registerModels = (sequelize: Sequelize) => {
  console.log(
    '📦 Modelos activos:',
    models.map((m) => m.name)
  ); // Imprime los modelos que se están registrando
  sequelize.addModels(models);
};

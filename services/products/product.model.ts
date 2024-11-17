import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db";

export class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public stock!: number;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "products",
  }
);

export const syncProductModel = async () => {
  await Product.sync({ alter: true }); // Crea la tabla si no existe
};

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db";

export class Product extends Model {
  public id!: string;
  public name!: string;
  public price!: number;
  public stock!: number;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
  await Product.sync({ alter: true });
};
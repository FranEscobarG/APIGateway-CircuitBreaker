import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "./sequelize";

// Definir los atributos del producto
interface ProductAttributes {
  id: string;
  name: string;
  price: number;
  stock: number;
}

// Definir atributos opcionales para creación
interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}

// Modelo Sequelize para Producto
export class ProductModel extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes {
  public id!: string;
  public name!: string;
  public price!: number;
  public stock!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductModel.init(
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

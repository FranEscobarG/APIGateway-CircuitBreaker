import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "./sequelize";

// Tipos para User
interface UserAttributes {
  id: string;
  name: string;
  email: string;
  age: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// Modelo Sequelize para Usuario
export class UserModel extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: string;
  public name!: string;
  public email!: string;
  public age!: number;
}

UserModel.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

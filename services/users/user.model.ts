import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db";

export class User extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public age!: number;
}

User.init(
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

export const syncUserModel = async () => {
  await User.sync({ alter: true });
};
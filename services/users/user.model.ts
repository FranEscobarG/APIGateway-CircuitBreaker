import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db";

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public age!: number;
}

User.init(
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

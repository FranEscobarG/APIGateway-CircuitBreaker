import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("api_gateway", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL database.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

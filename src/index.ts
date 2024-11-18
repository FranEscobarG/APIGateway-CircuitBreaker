import app from "./infrastructure/express/app";
import { sequelizeConfig } from "./config";

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelizeConfig.authenticate();
    console.log("Database connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

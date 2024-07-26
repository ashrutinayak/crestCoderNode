import express from "express";
import { sequelize } from "./config/database";
import router from "./route/index.route";
import { setupSwagger } from "./config/swagger";
import path from "path";

const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
// Swagger set up
setupSwagger(app);

// route set up
app.use("/", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Sync database
sequelize
  .sync()
  .then(() => console.log("Database synchronized"))
  .catch((error) => console.error("Error syncing database:", error));

import express from "express";
import db from "./config/db";
import budgetRouter from "./routes/budgetRouter";

const app = express();

// Conectar a la base de datos
async function connectDB() {
  try {
    await db.authenticate();
    await db.sync();
    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.log("Error al conectar a la base de datos:", error);
  }
}
connectDB();

app.use(express.json());

app.use("/api/budgets", budgetRouter);

export default app;

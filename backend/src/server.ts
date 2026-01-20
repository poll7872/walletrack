import express from "express";
import db from "./config/db";
import budgetRouter from "./routes/budgetRouter";
import authRouter from "./routes/authRouter";

export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log( 'Conexión a la bd con exito' )
  } catch (error) {
    // console.log(error)
    // console.log( 'fallo la conexión a la bd' )
  }
}
connectDB();

const app = express();

app.use(express.json());

app.use("/api/budgets", budgetRouter);
app.use("/api/auth", authRouter);

export default app;

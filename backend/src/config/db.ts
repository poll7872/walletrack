import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
  // Usamos el path dinámico para cargar todos los modelos de la carpeta
  models: [__dirname + "/../models/**/*.ts"],
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

export default db;

const express = require("express");
const sequelize = require("./config/database");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/products", productRoutes);

(async () => {
  try {
    await sequelize.sync();
    console.log("Banco de dados sincronizado com sucesso!");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao sincronizar o banco de dados:", error);
    process.exit(1);
  }
})();

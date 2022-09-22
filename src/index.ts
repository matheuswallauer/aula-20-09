import express, { application } from "express";
import { growdeverRoutes } from "./routes/growdeverRoutes";

const app = express();
app.use(express.json());

// API REST
// GET
// POST
// PUT
// DELETE

app.get("/teste", (req, res) => {
  //req => dados de requisicao
  //res => controle da resposta
});

app.use("/growdever", growdeverRoutes);

app.listen(3000, () => {
  console.log("API RODANDO...");
});

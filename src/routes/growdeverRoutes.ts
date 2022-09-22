import { Router } from "express";
import { growdeversList } from "../data/growdeversList";
import { Growdever } from "../models/growdever";

const growdeverRoutes = Router();

// GET /growdever => listar todos os growdevers

// GET http://localhost:3000/growdever (com query nome e idade)
// Listar todos os growdevers filtrando por nome e idade

growdeverRoutes.get("/all", (req, res) => {
  return res.send({
    ok: true,
    message: "Growdevers successfully listed",
    data: growdeversList,
  });
});

// Parametros:
// Body
// - JSON
// Query - Filtro
// http://localhost:3000/growdever?nome=joao&idade=34
// Route - Filtro por ID
// http: //localhost:3000/growdever?12345-abc

// GET - http://localhost:3000/growdever?nome=lucas&idade=22
growdeverRoutes.get("/", (req, res) => {
  //nome , idade => query
  //   const nome = req.query.nome;
  //   const idade = req.query.idade;
  const { nome, idade } = req.query;

  let lista = growdeversList;
  if (nome) {
    lista = lista.filter((item) => {
      return item._nome === nome;
    });
  }
  if (idade) {
    lista = lista.filter((item) => item._idade == Number(idade));
  }
  return res.send({
    ok: true,
    message: "Growdevers successfully listed",
    data: lista,
  });
});

//GET - http://localhost:3000/growdever/51ddc304-09e4-4a3e-b8a1-141f19c8444c
growdeverRoutes.get("/:id", (req, res) => {
  const { id } = req.params;

  let growdever = growdeversList.find((item) => item._id === id);

  if (!growdever) {
    return res.status(404).send({
      ok: false,
      message: "Growdever not found",
    });
  }

  return res.status(200).send({
    ok: true,
    message: "Growdevers successfully listed",
    data: growdever,
  });
});

// POST http://localhost:3000/growdever
//parametros => body
growdeverRoutes.post("/", (req, res) => {
  const { nome, idade, skills } = req.body;

  if (!nome) {
    return res.status(400).send({
      ok: false,
      message: "Name not provided",
    });
  }

  if (!idade) {
    return res.status(400).send({
      ok: false,
      message: "idade not provided",
    });
  }

  const growdever = new Growdever(nome, idade, skills);
  growdeversList.push(growdever);

  return res.status(201).send({
    ok: true,
    message: "Growdevers successfully listed",
    data: growdeversList,
  });
});

// DELETE http://localhost:3000/growdever
growdeverRoutes.delete("/:id", (req, res) => {
  const { id } = req.params;

  let growdeverIndex = growdeversList.findIndex((item) => item._id === id);
  if (!growdeverIndex) {
    return res.status(404).send({
      ok: false,
      message: "Growdever not found",
    });
  }
  growdeversList.splice(growdeverIndex, 1);

  return res.status(200).send({
    ok: true,
    message: "Growdevers successfully deleted",
    data: growdeversList,
  });
});

export { growdeverRoutes };

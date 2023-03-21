const express = require("express");
const  GrupoController= require("../controllers/grupo");
const multiparty = require("connect-multiparty");
const md_auth = require("../middleware/authenticated");

const md_upload = multiparty({uploadDir: "./uploads/grupo"});


const api = express.Router();


api.post("/grupo", [md_auth.asureAuth, md_upload],GrupoController.createGrupo); // se crean grupos, usuario debe estar autenticado (privado)
api.get("/grupos", GrupoController.getGrupos); // Se obtienen grupos (Publico)
api.patch("/grupo/:id",[md_auth.asureAuth, md_upload],GrupoController.updateGrupo); // privada
api.delete("/grupo/:id",[md_auth.asureAuth],GrupoController.deleteGrupo); // Elimina grupo, usuario debe estar autenticado (privado)
module.exports = api;


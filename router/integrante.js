const express = require("express");
const  IntegranteController= require("../controllers/Integrante");
const multiparty = require("connect-multiparty");
const md_auth = require("../middleware/authenticated");

const md_upload = multiparty({uploadDir: "./uploads/integrante"});


const api = express.Router();


api.post("/integrante", [md_auth.asureAuth, md_upload],IntegranteController.createIntegrante); // se crean INTEGRANTES, usuario debe estar autenticado (privado)
api.get("/integrante/:id_subgrupo",IntegranteController.getIntegrante);
api.get("/integrantes", IntegranteController.getIntegrantes); // Se obtienen integrantes (Publico)
api.delete("/integrante/:id",[md_auth.asureAuth],IntegranteController.deleteIntegrante); // Elimina integrante, usuario debe estar autenticado (privado)
api.patch("/integrante/:id",[md_auth.asureAuth, md_upload],IntegranteController.updateIntegrante); // Actualiza integrante, privado
module.exports = api;


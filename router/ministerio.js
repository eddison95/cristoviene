const express = require("express");
const  MinisterioController= require("../controllers/ministerio");
const multiparty = require("connect-multiparty");
const md_auth = require("../middleware/authenticated");

const md_upload = multiparty({uploadDir: "./uploads/ministerio"});


const api = express.Router();


api.post("/ministerio", [md_auth.asureAuth, md_upload],MinisterioController.createMinisterio); // se crean ministerios, usuario debe estar autenticado (privado)
api.get("/ministerios", MinisterioController.getMinisterios); // Se obtienen ministerios (Publico)
api.patch("/ministerio/:id",[md_auth.asureAuth, md_upload],MinisterioController.updateMinisterio); // actualiza ministerio, usuario debe estar autenticado (privado)
api.delete("/ministerio/:id",[md_auth.asureAuth],MinisterioController.deleteMinisterio); // Elimina ministerio, usuario debe estar autenticado (privado)
api.get("/ministerio/:_id",MinisterioController.getMinisterio); // No necesita usuario autenticado (publico)


module.exports = api;

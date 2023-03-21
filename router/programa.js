const express = require("express");
const  ProgramaController= require("../controllers/programa");
const multiparty = require("connect-multiparty");
const md_auth = require("../middleware/authenticated");

const md_upload = multiparty({uploadDir: "./uploads/programa"});


const api = express.Router();


api.post("/programa", [md_auth.asureAuth, md_upload],ProgramaController.createPrograma); // se crean programas, usuario debe estar autenticado (privado)
api.get("/programa", ProgramaController.getPrograma); // Se obtienen programas (Publico)
api.patch("/programa/:id",[md_auth.asureAuth, md_upload],ProgramaController.updatePrograma); // actualiza programa, usuario debe estar autenticado (privado)
api.delete("/programa/:id",[md_auth.asureAuth],ProgramaController.deletePrograma); // Elimina programa, usuario debe estar autenticado (privado)
//api.get("/ministerio/:title",MinisterioController.getMinisterio); // No necesita usuario autenticado (publico)


module.exports = api;

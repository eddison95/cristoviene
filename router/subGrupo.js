const express = require("express");
const  subGrupoController= require("../controllers/subgrupo");
const multiparty = require("connect-multiparty");
const md_auth = require("../middleware/authenticated");

const md_upload = multiparty({uploadDir: "./uploads/subGrupo"});


const api = express.Router();


api.post("/subgrupo", [md_auth.asureAuth, md_upload],subGrupoController.createSubGrupo); // se crean subGrupos, usuario debe estar autenticado (privado)
api.get("/subgrupo/:id_grupo",subGrupoController.getSubGrupos);
api.get("/subgrupopequeno/:_id",subGrupoController.getSubGrupo); // Trae un solo subgrupo
api.delete("/subgrupo/:id",[md_auth.asureAuth],subGrupoController.deleteSubGrupo); // Elimina subgrupo, usuario debe estar autenticado (privado)
api.patch("/subgrupo/:id",[md_auth.asureAuth, md_upload],subGrupoController.updateSubGrupo); // Actualiza subgrupo, privado
module.exports = api;


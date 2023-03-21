const express = require("express");
const  ActividadController= require("../controllers/actividad");
const multiparty = require("connect-multiparty");
const md_auth = require("../middleware/authenticated");

const md_upload = multiparty({uploadDir: "./uploads/actividad"});


const api = express.Router();


api.post("/actividad", [md_auth.asureAuth, md_upload],ActividadController.createActividad); // se crean actividades, usuario debe estar autenticado (privado)
api.get("/actividad/:id_ministerio",ActividadController.getActividades); // No necesita usuario autenticado (publico)
api.patch("/actividad/:id",[md_auth.asureAuth, md_upload],ActividadController.updateActividad); 
api.delete("/actividad/:id",[md_auth.asureAuth],ActividadController.deleteActividad);

module.exports = api;

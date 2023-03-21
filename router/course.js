const express = require("express");
const  CourseController= require("../controllers/course");
const multiparty = require("connect-multiparty");
const md_auth = require("../middleware/authenticated");


const md_upload = multiparty({uploadDir: "./uploads/course"});


const api = express.Router();


api.post("/course", [md_auth.asureAuth, md_upload],CourseController.createCourse); // se crean cursos, usuario debe estar autenticado (privado)
api.get("/courses", CourseController.getCourses); // Se obtienen cursos (Publico)
api.patch("/course/:id",[md_auth.asureAuth, md_upload],CourseController.updateCourse); // actualiza curso, usuario debe estar autenticado (privado)
api.delete("/course/:id",[md_auth.asureAuth],CourseController.deleteCourse); // Elimina curso, usuario debe estar autenticado (privado)


module.exports = api;
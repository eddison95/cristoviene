const express = require("express");
const postController = require("../controllers/post");
const md_auth = require("../middleware/authenticated");
const multiparty = require("connect-multiparty");


const md_upload = multiparty({uploadDir: "./uploads/blog"});
const api = express.Router();


// Rutas
api.post("/post",[md_auth.asureAuth, md_upload] , postController.createPost); // crea post, usuario debe estar autenticado (privado)
api.get("/posts",postController.getPosts); // es publico
api.patch("/post/:id",[md_auth.asureAuth, md_upload],postController.updatePost); // Actualiza post, usuario debe estar autenticado (privado)
api.delete("/post/:id",[md_auth.asureAuth],postController.deletePost); // Elimina post, usuario debe estar autenticado (privado)
api.get("/post/:path",postController.getPost); // No necesita usuario autenticado (publico)


 


module.exports = api;


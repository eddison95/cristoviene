const express = require("express");
const  MenuController= require("../controllers/menu");
const md_auth = require("../middleware/authenticated");

const api = express.Router();


api.post("/menu",[md_auth.asureAuth],MenuController.createMenu); // Solo usuarios autenticados pueden crear menus 
api.get("/menu", MenuController.getMenus); // Solo usuarios autenticados pueden crear menus 
api.patch("/menu/:id",[md_auth.asureAuth], MenuController.updateMenu);
api.delete("/menu/:id", [md_auth.asureAuth],MenuController.deleteMenu);  // elimina el usuario



module.exports = api;


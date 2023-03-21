const express = require("express");
const  NewsletterController = require("../controllers/newsletter");
const md_auth = require("../middleware/authenticated");


const api = express.Router();


api.post("/newsletter",NewsletterController.susbcribeEmail); // guarda email
api.get("/newsletter",[md_auth.asureAuth],NewsletterController.getEmails); // obtiene email, es privado
api.delete("/newsletter/:id",[md_auth.asureAuth],NewsletterController.deleteEmail); // elimina email

module.exports = api;
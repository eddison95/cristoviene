const express = require("express");
const {API_VERSION} =require("./constants");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


// import rutas
const authRoutes = require("./router/auth");
const UserRouter = require("./router/user");
const menuRoutes = require("./router/menu");
const courseRoutes = require("./router/course");
const postRoutes = require("./router/post");
const newsletterRoutes = require("./router/newsletter");
const ministerioRoutes = require("./router/ministerio");
const actividadRoutes = require("./router/actividad");
const grupoRoutes = require("./router/grupo");
const subGrupoRoutes = require("./router/subGrupo");
const integranteRoutes = require("./router/integrante");
const programaRoutes = require("./router/programa");

// Configurar body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Configurar static files (arhicvos de uploads)
app.use(express.static("uploads"));

// configurar Header HTTP - CORS
app.use(cors());


// Configurar routes
app.use(`/api/${API_VERSION}`,authRoutes);
app.use(`/api/${API_VERSION}`,UserRouter);
app.use(`/api/${API_VERSION}`,menuRoutes);
app.use(`/api/${API_VERSION}`,courseRoutes);
app.use(`/api/${API_VERSION}`,postRoutes);
app.use(`/api/${API_VERSION}`,newsletterRoutes);
app.use(`/api/${API_VERSION}`,ministerioRoutes);
app.use(`/api/${API_VERSION}`,actividadRoutes);
app.use(`/api/${API_VERSION}`,grupoRoutes);
app.use(`/api/${API_VERSION}`,subGrupoRoutes);
app.use(`/api/${API_VERSION}`,integranteRoutes);
app.use(`/api/${API_VERSION}`,programaRoutes);



module.exports = app;

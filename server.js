const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const prisma = new PrismaClient();
const hbs = require("hbs");
app.set("view engine", "hbs"); // On définit le moteur de template que Express va utiliser
app.set("views", path.join(__dirname, "views")); // On définit le dossier des vues (dans lequel se trouvent les fichiers .hbs)
hbs.registerPartials(path.join(__dirname, "views", "partials")); // On définit le dossier des partials (composants e.g. header, footer, menu...)
const PORT = 3000;

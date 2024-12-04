const express = require("express");
const path = require("path"); // Import the path module
const app = express();
app.disable("view cache");
//const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
//const prisma = new PrismaClient();
const hbs = require("hbs");
//console.log("HBS loaded:", hbs);
app.set("view engine", "hbs"); // On définit le moteur de template que Express va utiliser
app.set("views", path.join(__dirname, "views")); // On définit le dossier des vues (dans lequel se trouvent les fichiers .hbs)
hbs.registerPartials(path.join(__dirname, "views", "partials")); // On définit le dossier des partials (composants e.g. header, footer, menu...)
app.engine('hbs', require('hbs').__express);
const PORT = 3000;

app.get("/", async (req, res) => {
    // on passe seulement le nom du fichier .hbs sans l'extention.
    // Le chemin est relatif au dossier `views`.
    // On peut aller chercher des templates dans les sous-dossiers (e.g. `movies/details`).
    res.render("index");
    //res.sendFile(path.join(__dirname, "views", "index.hbs"));
    //res.send("Hello, World!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
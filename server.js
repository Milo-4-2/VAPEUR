// Import the Express framework for building web applications
const express = require("express");

// Import the path module for handling file and directory paths
const path = require("path");

// Initialize the Express application
const app = express();

// Define a folder for static files
app.use(express.static("public"));

// Cconfigure PrismaClient for database operations
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Import the body parser module to parse incoming request bodies
const bodyParser = require("body-parser");

// Import the Handlebars template engine
const hbs = require("hbs");

// Set Handlebars as the template engine for Express
app.set("view engine", "hbs");

// Specify the directory where view templates are located (.hbs files)
app.set("views", path.join(__dirname, "views"));

// Register the directory for partial templates used in Handlebars (header, footer, etc.)
hbs.registerPartials(path.join(__dirname, "views", "partials"));

// Define the port on which the server will listen for incoming requests
const PORT = 3000;

// Define a route for the root URL that renders the "index.hbs" template (views/index.hbs)
app.get("/", async (req, res) => {
    res.render("index");
});

app.get("/addnewgame", async (req, res) => {
    const genres = await prisma.genre.findMany();
    res.render("games/newGame", {genres});
});

// Start the server and log a message to indicate that it is running
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const express = require("express"); // Import the Express framework for building web applications

const path = require("path"); // Import the path module for handling file and directory paths

const app = express(); // Initialize the Express application

app.use(express.static("public")); // Define a folder for static files

// Cconfigure PrismaClient for database operations
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bodyParser = require("body-parser"); // Import the body parser module to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

const hbs = require("hbs"); // Import the Handlebars template engine

const multer = require("multer");
const upload = multer({ dest: "covers/" }); // For handling file uploads


app.set("view engine", "hbs"); // Set Handlebars as the template engine for Express

app.set("views", path.join(__dirname, "views")); // Specify the directory where view templates are located (.hbs files)


hbs.registerPartials(path.join(__dirname, "views", "partials")); // Register the directory for partial templates used in Handlebars (header, footer, etc.)


const PORT = 3000; // Define the port on which the server will listen for incoming requests

// Define a route for the root URL that renders the "index.hbs" template (views/index.hbs)
app.get("/", async (req, res) => {
    res.render("index");
});

// Define a route for the "add a new game" page's URL that renders the "newGame.hbs" template (views/games/newGame.hbs)
app.get("/new-game", async (req, res) => {
    // Query the Prisma database to get all the possible video game genres and editors
    const genres = await prisma.genre.findMany();
    const editors = await prisma.editor.findMany();
    // Pass the genres to the template to show them in the HTML <select> tag of the "add a new game" page
    res.render("games/newGame", {genres, editors});
});

app.post("/submit-game", upload.single("cover"), async (req, res) => {
    const { name, description, releaseDate, editor, genre } = req.body;

    try {
        // Save data to the database
        const newGame = await prisma.game.create({
            data: {
                name,
                description,
                releaseDate : new Date(releaseDate), // Convert to Date object
                editorId: parseInt(editor, 10),
                genreId: parseInt(genre, 10),
                //coverPath: req.file ? req.file.path : null, // Save file path if a cover is uploaded
            },
        });

        res.status(201).json({ message: "Game added successfully!", game: newGame });
    } catch (error) {
        console.error("Error saving game:", error);
        res.status(400).json({ message: "Failed to save game" });
    }
});

// Start the server and log a message to indicate that it is running with the port it's running on
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

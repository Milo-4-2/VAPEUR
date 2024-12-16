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
const sharp = require("sharp");

const storage = multer.memoryStorage();

const upload = multer({ storage });


app.set("view engine", "hbs"); // Set Handlebars as the template engine for Express

app.set("views", path.join(__dirname, "views")); // Specify the directory where view templates are located (.hbs files)


hbs.registerPartials(path.join(__dirname, "views", "partials")); // Register the directory for partial templates used in Handlebars (header, footer, etc.)


const PORT = 3000; // Define the port on which the server will listen for incoming requests

// Define a route for the root URL that renders the "index.hbs" template (views/index.hbs)
app.get("/", async (req, res) => {
    res.render("index");
});

// Define a route for the "add a new game" page's URL that renders the "newGame.hbs" template (views/games/newGame.hbs)
app.get("/add-new-game", async (req, res) => {
    // Query the Prisma database to get all the possible video game genres and editors
    const genres = await prisma.genre.findMany();
    const editors = await prisma.editor.findMany();
    // Pass the genres to the template to show them in the HTML <select> tag of the "add a new game" page
    res.render("games/newGame", {genres, editors, title: "VAPEUR - Add a new game"});
});

app.post("/submit-game", upload.single("cover"), async (req, res) => {
    const { name, description, releaseDate, editor, genre } = req.body;

    const timestamp = Date.now();
    const outputFilename = `${timestamp}-${req.file.originalname.split('.')[0]}.jpeg`;
    const outputPath = path.join(__dirname, "public/covers", outputFilename);

    try {
        await sharp(req.file.buffer)
            .resize({ width: 400, height: 600, fit: "cover" }) // Crop to 400x600 pixels
            .jpeg({ quality: 80 }) // Compress to 80% quality
            .toFile(outputPath);

        // Save data to the database
        const newGame = await prisma.game.create({
            data: {
                name,
                description,
                releaseDate : new Date(releaseDate), // Convert to Date object
                editorId: parseInt(editor, 10),
                genreId: parseInt(genre, 10),
                coverPath: `covers/${path.basename(outputPath)}`, // Save relative path to the database
            },
        });

        res.status(201).json({ message: "Game added successfully!", game: newGame });
    } catch (error) {
        console.error("Error saving game:", error);
        res.status(400).json({ message: "Failed to save game" });
    }
});

app.get("/editors", async (req, res) => {
    // Query the Prisma database to get all the possible video game editors
    const editors = await prisma.editor.findMany();
    res.render("games/editors", {editors, title: "VAPEUR - Editors"});
});

app.get("/add-new-editor", async (req, res) => {
    res.render("games/newEditor", {title: "VAPEUR - Add a new editor"});
});

app.post("/submit-editor", upload.none(), async (req, res) => {
    const { name } = req.body;

    try {
    
        const newEditor = await prisma.editor.create({
            data: {
                name,
            },
        });
    
        res.status(201).json({ message: "Editor created successfully!", game: newEditor });
    } catch (error) {
        console.error("Error when creating editor:", error);
        res.status(500).json({ message: "An error occurred while creating the editor.\nThis might occur because the editor already exists." });
    }
});

// Start the server and log a message to indicate that it is running with the port it's running on
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

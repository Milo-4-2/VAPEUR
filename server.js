const express = require("express"); // Import the Express framework for building web applications
const path = require("path"); // Import the path module for handling file and directory paths

const app = express(); // Initialize the Express application

// Configure PrismaClient for database operations
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bodyParser = require("body-parser"); // Middleware for parsing URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));

const hbs = require("hbs"); // Import Handlebars as the template engine
const multer = require("multer"); // Middleware for handling file uploads
const sharp = require("sharp"); // Library for image processing
const fs = require("fs"); // Node.js file system module for file operations
const storage = multer.memoryStorage(); // Use in-memory storage for uploaded files
const upload = multer({ storage }); // Configure Multer with in-memory storage

// Set Handlebars as the template engine
app.set("view engine", "hbs");

// Set the directory for Handlebars view templates
app.set("views", path.join(__dirname, "views"));

// Register the directory for reusable partial templates
hbs.registerPartials(path.join(__dirname, "views", "partials"));

// Register the directory for static files
app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000; // Define the port on which the server listens for requests

// Route: Home page listing all games
app.get("/", async (req, res) => {
    const games = await prisma.game.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            releaseDate: true,
            genreId: true,
            coverPath: true,
            editorId: true,
            genre: { select: { name: true } },
            editor: { select: { name: true } },
        },
        orderBy: { name: "desc" }, // Sort games by name in descending order
    });

    // Format release dates for display
    games.forEach(game => {
        game.releaseDate = new Date(game.releaseDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    });

    res.render("index", { games, title: "VAPEUR - Games" }); // Render the home page
});

// Route: "Add a new game" form
app.get("/add-new-game", async (req, res) => {
    const genres = await prisma.genre.findMany(); // Fetch all genres
    const editors = await prisma.editor.findMany(); // Fetch all editors
    res.render("games/newGame", { genres, editors, title: "VAPEUR - Add a new game" });
});

// Route: Handle new game submission
app.post("/submit-game", upload.single("cover"), async (req, res) => {
    const { name, description, releaseDate, editor, genre } = req.body;

    const timestamp = Date.now();
    const outputFilename = `${timestamp}-${req.file.originalname.split(".")[0]}.jpeg`;
    const outputPath = path.join(__dirname, "public/covers", outputFilename);

    // Resize and compress uploaded image
    await sharp(req.file.buffer)
        .resize({ width: 400, height: 600, fit: "cover" })
        .jpeg({ quality: 80 })
        .toFile(outputPath);

    // Save the new game to the database
    const newGame = await prisma.game.create({
        data: {
            name,
            description,
            releaseDate: new Date(releaseDate),
            editorId: parseInt(editor, 10),
            genreId: parseInt(genre, 10),
            coverPath: `covers/${path.basename(outputPath)}`,
        },
    });

    res.status(201).json({ message: "Game added successfully!", game: newGame });
});

// Route: Handle updates to an existing game
app.post("/submit-game-changes", upload.none(), async (req, res) => {
    const { id, name, description, releaseDate, editor, genre } = req.body;

    const updatedGame = await prisma.game.update({
        where: { id: parseInt(id, 10) },
        data: {
            name,
            description,
            releaseDate: new Date(releaseDate),
            editorId: parseInt(editor, 10),
            genreId: parseInt(genre, 10),
        },
    });

    res.status(201).json({ message: "Game successfully updated!", game: updatedGame });
});

// Route: Handle updates to an editor
app.post("/submit-editor-changes", upload.none(), async (req, res) => {
    const { id, name } = req.body;

    const updatedEditor = await prisma.editor.update({
        where: { id: parseInt(id, 10) },
        data: { name },
    });

    res.status(201).json({ message: "Editor successfully updated!", editor: updatedEditor });
});

// Route: Delete a game
app.post("/delete-game", upload.none(), async (req, res) => {
    const { id } = req.body;

    if (!id || isNaN(parseInt(id, 10))) {
        return res.status(400).json({ message: "Game ID is required and must be a number." });
    }

    const gameId = parseInt(id, 10);

    // Fetch the game's cover path
    const game = await prisma.game.findUnique({
        where: { id: gameId },
        select: { coverPath: true },
    });

    if (!game || !game.coverPath) {
        return res.status(404).json({ message: "Game not found or no cover path available." });
    }

    const coverPath = path.join(__dirname, "public", game.coverPath);
    await fs.promises.unlink(coverPath); // Delete the cover image

    // Delete the game from the database
    const deletedGame = await prisma.game.delete({ where: { id: gameId } });

    res.status(200).json({ message: "Game successfully deleted!" });
});

// Route: Display all editors
app.get("/editors", async (req, res) => {
    const editors = await prisma.editor.findMany(); // Fetch all editors
    res.render("games/editors", { editors, title: "VAPEUR - Editors" });
});

// Route: Display all genres
app.get("/genres", async (req, res) => {
    const genres = await prisma.genre.findMany(); // Fetch all genres
    res.render("games/genres", { genres, title: "VAPEUR - Genres" });
});

// Route: "Add a new editor" form
app.get("/add-new-editor", async (req, res) => {
    res.render("games/newEditor", { title: "VAPEUR - Add a new editor" });
});

// Route: Handle new editor submission
app.post("/submit-editor", upload.none(), async (req, res) => {
    const { name } = req.body;

    const newEditor = await prisma.editor.create({ data: { name } });
    res.status(201).json({ message: "Editor created successfully!", editor: newEditor });
});

// Route: Display details for a specific game
app.get("/game/:id", async (req, res) => {
    const { id } = req.params;

    const game = await prisma.game.findUnique({
        where: { id: parseInt(id, 10) },
        select: {
            id: true,
            name: true,
            description: true,
            releaseDate: true,
            genreId: true,
            coverPath: true,
            editorId: true,
            genre: { select: { name: true } },
            editor: { select: { name: true } },
        },
    });

    game.releaseDate = new Date(game.releaseDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    res.render("games/gameDetails", { game, title: `VAPEUR - ${game.name}` });
});

// Route: Display details for a specific editor
app.get("/editor/:id", async (req, res) => {
    const { id } = req.params;

    const editor = await prisma.editor.findUnique({ where: { id: parseInt(id, 10) } });

    const games = await prisma.game.findMany({
        where: { editorId: parseInt(id, 10) },
        select: {
            id: true,
            name: true,
            description: true,
            releaseDate: true,
            genreId: true,
            coverPath: true,
            editorId: true,
            genre: { select: { name: true } },
            editor: { select: { name: true } },
        },
    });

    games.forEach(game => {
        game.releaseDate = new Date(game.releaseDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    });

    res.render("games/editorDetails", { editor, games, title: `VAPEUR - ${editor.name}` });
});

// Route: Display details for a specific genre
app.get("/genre/:id", async (req, res) => {
    const { id } = req.params;

    const genre = await prisma.genre.findUnique({ where: { id: parseInt(id, 10) } });

    if (!genre) {
        return res.status(404).render("404", { message: "Genre not found" });
    }

    const games = await prisma.game.findMany({
        where: { genreId: parseInt(id, 10) },
        select: {
            id: true,
            name: true,
            description: true,
            releaseDate: true,
            genreId: true,
            coverPath: true,
            editorId: true,
            genre: { select: { name: true } },
            editor: { select: { name: true } },
        },
    });

    games.forEach(game => {
        game.releaseDate = new Date(game.releaseDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    });

    res.render("games/genreDetails", { genre, games, title: `VAPEUR - ${genre.name}` });
});

// Route: Edit a game
app.get("/edit-game/:id", async (req, res) => {
    const { id } = req.params;

    const game = await prisma.game.findUnique({
        where: { id: parseInt(id, 10) },
        select: {
            id: true,
            name: true,
            description: true,
            releaseDate: true,
            genreId: true,
            coverPath: true,
            editorId: true,
        },
    });

    game.releaseDate = new Date(game.releaseDate).toISOString().split("T")[0]; // Format date for input fields

    const editors = await prisma.editor.findMany();
    const genres = await prisma.genre.findMany();

    res.render("games/editGame", { game, editors, genres, title: "VAPEUR - Edit a game" });
});

// Route: Edit an editor
app.get("/edit-editor/:id", async (req, res) => {
    const { id } = req.params;

    const editor = await prisma.editor.findUnique({
        where: { id: parseInt(id, 10) },
        select: { id: true, name: true },
    });

    res.render("games/editEditor", { editor, title: "VAPEUR - Edit an editor" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

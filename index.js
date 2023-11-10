const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

// importing DB
const db = require("./db/models/index");
const { sighting, comment, category } = db;

// import controllers
const SightingController = require("./controllers/SightingsController.js");
const sightingController = new SightingController(sighting);

const CommentController = require("./controllers/CommentController.js");
const commentController = new CommentController(comment);

const CategoryController = require("./controllers/CategoriesController.js");
const categoryController = new CategoryController(category);

// import routers

const SightingRouter = require("./routers/SightingsRouter.js");
const sightingRouter = new SightingRouter(sightingController, express);

const CommentRouter = require("./routers/CommentsRouter.js");
const commentRouter = new CommentRouter(commentController, express);

const CategoryRouter = require("./routers/CategoriesRouter.js");
const categoryRouter = new CategoryRouter(categoryController, express);

// Setting up middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routing requests
app.use("/sightings", sightingRouter.route());
app.use("/sightings/:id/comments", commentRouter.route());
app.use("/categories", categoryRouter.route());

// Define a route for creating a new sighting
app.post("/sightings", async (req, res) => {
  try {
    // Handle the creation of a new sighting here
    // This is where you should save the data to your database
    const newSighting = await sightingController.createSighting(req.body); // Use your controller to create a sighting
    res.status(201).json(newSighting);
  } catch (error) {
    console.error("Error creating a new sighting:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Start server
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});

// routers/SightingRouter.js

class SightingRouter {
  constructor(sightingController, express) {
    this.sightingController = sightingController;
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    // Update the get route to handle query parameters
    this.router.get("/", async (req, res) => {
      try {
        const sightings = await this.sightingController.getSightings(req.query);
        res.status(200).json(sightings);
      } catch (error) {
        console.error("Error fetching sightings:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    this.router.get(
      "/:id",
      this.sightingController.getById.bind(this.sightingController)
    );
    this.router.post(
      "/",
      this.sightingController.createOne.bind(this.sightingController)
    );
  }

  route() {
    return this.router;
  }
}

module.exports = SightingRouter;

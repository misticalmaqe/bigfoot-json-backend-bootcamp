const BaseController = require("./BaseController.js");

class CommentController extends BaseController {
  constructor(commentModel) {
    super(commentModel);
  }

  async createWithParentId(req, res) {
    try {
      const bodyWithParentId = {
        ...req.body,
        sighting_id: req.params.id, // Use the sightingId from the params
      };
      const newRecord = await this.model.create(bodyWithParentId);
      res.status(201).json(newRecord);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error creating record", error: error.message });
    }
  }
}

module.exports = CommentController;
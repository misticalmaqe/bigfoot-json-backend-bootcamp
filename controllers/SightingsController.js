const BaseController = require("./BaseController.js");
const { Op } = require("sequelize");

class SightingController extends BaseController {
  constructor(sightingModel) {
    super(sightingModel);
  }

  async getSightings(query) {
    // Apply filters
    let whereClause = {};

    if (query.year) {
      whereClause.date = {
        [Op.between]: [
          new Date(`${query.year}-01-01`),
          new Date(`${parseInt(query.year) + 1}-01-01`),
        ],
      };
    }

    // Apply sorting (you can modify this based on your needs)
    let order = [];
    if (query.sortBy && query.order) {
      order.push([query.sortBy, query.order.toUpperCase()]);
    } else {
      // Default sorting if not provided
      order.push(["createdAt", "ASC"]);
    }

    return await this.model.findAll({
      where: whereClause,
      order: order,
    });
  }

  async getSightingsInLocation(location) {
    return await this.model.findAll({ where: { location } });
  }

  async getRecentSightings(limit = 10) {
    return await this.model.findAll({
      order: [["createdAt", "DESC"]],
      limit,
    });
  }
}

module.exports = SightingController;

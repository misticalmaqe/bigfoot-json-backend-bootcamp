"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sighting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Sightings has many comments
      sighting.hasMany(models.comment, { foreignKey: "sighting_id" });
      sighting.belongsToMany(models.category, {
        through: "sighting_categories",
      });
    }
  }
  sighting.init(
    {
      date: DataTypes.DATE,
      location: DataTypes.STRING,
      notes: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "sighting",
      underscored: true,
    }
  );
  return sighting;
};

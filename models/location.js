"use strict";
const { v4: uuidv4 } = require("uuid");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Location.hasMany(models.Event);
    }
  }
  Location.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      locationName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Location",
      hooks: {
        beforeCreate: (location, option) => {
          location.id = uuidv4();
        },
      },
    }
  );
  return Location;
};

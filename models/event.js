"use strict";
const { v4: uuidv4 } = require("uuid");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      location: DataTypes.UUID,
      schedule: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Event",
      hooks: {
        beforeCreate: (event, option) => {
          event.id = uuidv4();
        },
      },
    }
  );
  return Event;
};

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
      Event.belongsTo(models.Location, { foreignKey: "LocationId" });
      Event.belongsTo(models.Schedule, { foreignKey: "ScheduleId" });
      Event.hasMany(models.Ticket, { as: "Tickets" });
      Event.hasMany(models.Transaction);
    }
  }
  Event.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "Event Name cannot be empty!" },
          notNull: { args: true, msg: "Event Name cannot be empty!" },
        },
      },
      LocationId: DataTypes.UUID,
      ScheduleId: DataTypes.UUID,
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

"use strict";
const { v4: uuidv4 } = require("uuid");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.hasOne(models.Event);
    }
  }
  Schedule.init(
    {
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Start Date cannot be empty!" },
          isDate: { args: true, msg: "Wrong Start Date Format" },
        },
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: { msg: "End Date cannot be empty!" },
          isDate: { args: true, msg: "Wrong End Date Format" },
        },
      },
    },
    {
      sequelize,
      modelName: "Schedule",
      hooks: {
        beforeCreate: (schedule, option) => {
          schedule.id = uuidv4();
        },
      },
      validate: {
        endDateValidation() {
          if (this.startDate > this.endDate) {
            throw new Error("End Date must be after Start Date");
          }
        },
      },
    }
  );
  return Schedule;
};

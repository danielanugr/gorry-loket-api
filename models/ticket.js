"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.Event, { foreignKey: "EventId" });
      // Ticket.belongsToMany(models.Transaction, {
      //   through: models.TransactionTicket,
      // });
      Ticket.hasMany(models.TransactionTicket);
    }
  }
  Ticket.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      EventId: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: {
            args: true,
            msg: "Event ID cannot be empty!",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "Ticket name cannot be empty!" },
          notNull: { args: true, msg: "Ticket name cannot be empty!" },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        validate: {
          priceValidator() {
            if (this.price < 0) {
              throw new Error("Price Cannot be below 0");
            }
          },
        },
      },
      quota: {
        type: DataTypes.INTEGER,
        validate: {
          quotaValidator() {
            if (this.quota < 0) {
              throw new Error("Ticket Sold Out");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Ticket",
      hooks: {
        beforeCreate: (ticket, option) => {
          ticket.id = uuidv4();
        },
      },
    }
  );
  return Ticket;
};

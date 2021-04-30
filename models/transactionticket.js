"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class TransactionTicket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionTicket.belongsTo(models.Ticket);
      TransactionTicket.belongsTo(models.Transaction);
    }
  }
  TransactionTicket.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      TransactionId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "Transaction ID cannot be empty!" },
          notNull: { args: true, msg: "Transaction ID cannot be empty!" },
        },
      },
      TicketId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "Event ID cannot be empty!" },
          notNull: { args: true, msg: "Event ID cannot be empty!" },
        },
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "Event ID cannot be empty!" },
          notNull: { args: true, msg: "Event ID cannot be empty!" },
        },
      },
    },
    {
      sequelize,
      modelName: "TransactionTicket",
      hooks: {
        beforeBulkCreate: (tickets, option) => {
          tickets.forEach((ticket) => {
            ticket.id = uuidv4();
          });
        },
      },
    }
  );
  return TransactionTicket;
};

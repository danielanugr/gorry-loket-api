"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Event, { foreignKey: "EventId" });
      // Transaction.belongsToMany(models.Ticket, {
      //   through: models.TransactionTicket,
      // });
      Transaction.hasMany(models.TransactionTicket);
    }
  }
  Transaction.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      customerName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "Customer Name cannot be empty!" },
          notNull: { args: true, msg: "Customer Name cannot be empty!" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "Email cannot be empty!" },
          notNull: { args: true, msg: "Email cannot be empty!" },
          isEmail: { args: true, msg: "Invalid Email format" },
        },
      },
      EventId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "Event ID cannot be empty!" },
          notNull: { args: true, msg: "Event ID cannot be empty!" },
        },
      },
    },
    {
      sequelize,
      modelName: "Transaction",
      hooks: {
        beforeCreate: (transaction, option) => {
          transaction.id = uuidv4();
        },
      },
    }
  );
  return Transaction;
};

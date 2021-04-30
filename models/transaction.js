"use strict";
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
    }
  }
  Transaction.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      customerName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "Ticket name cannot be empty!" },
          notNull: { args: true, msg: "Ticket name cannot be empty!" },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: { args: true, msg: "Invalid Email format" },
        },
      },
      EventId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "transaction",
    }
  );
  return Transaction;
};

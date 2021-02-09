'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Transactions.belongsTo(models.Users, {
      //   as: "users",
      // });
    }
  };
  Transactions.init({
    users: DataTypes.STRING,
    transferProof: DataTypes.STRING,
    remainingActive: DataTypes.INTEGER,
    userStatus: DataTypes.STRING,
    paymentStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};
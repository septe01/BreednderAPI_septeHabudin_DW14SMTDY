'use strict';
module.exports = (sequelize, DataTypes) => {
  const payment = sequelize.define('payment', {
    no_rek: DataTypes.STRING,
    proof_of_transfer: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  payment.associate = function(models) {
    // associations can be defined here
  };
  return payment;
};
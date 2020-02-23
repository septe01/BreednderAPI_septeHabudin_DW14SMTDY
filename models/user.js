"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      breeder: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      role: DataTypes.STRING
    },
    {}
  );
  user.associate = function(models) {
    // associations can be defined here
    // user.hasMany(models.pet, {
    //   foreignKey: "user_id"
    // });
  };
  return user;
};

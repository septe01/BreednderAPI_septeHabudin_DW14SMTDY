"use strict";
module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define(
    "pet",
    {
      name: DataTypes.STRING,
      gender: DataTypes.STRING,
      about_pet: DataTypes.STRING,
      photo: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      spesies_id: DataTypes.INTEGER,
      age_id: DataTypes.INTEGER
    },
    {}
  );
  pet.associate = function(models) {
    // associations can be defined here
  };
  return pet;
};

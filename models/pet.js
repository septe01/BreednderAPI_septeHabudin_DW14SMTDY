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
    pet.belongsTo(models.user, {
      foreignKey: "user_id"
    });
    pet.belongsTo(models.spesies, {
      foreignKey: "spesies_id"
    });
    pet.belongsTo(models.age, {
      foreignKey: "age_id"
    });
  };
  return pet;
};

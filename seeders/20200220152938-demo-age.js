"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "ages",
      [
        {
          name: "toddler",
          createdAt: "0000-00-00",
          updatedAt: "0000-00-00"
        },
        {
          name: "a child",
          createdAt: "0000-00-00",
          updatedAt: "0000-00-00"
        },
        {
          name: "a teenager",
          createdAt: "0000-00-00",
          updatedAt: "0000-00-00"
        },
        {
          name: "adult",
          createdAt: "0000-00-00",
          updatedAt: "0000-00-00"
        },
        {
          name: "Elderly",
          createdAt: "0000-00-00",
          updatedAt: "0000-00-00"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("ages", null, {});
  }
};

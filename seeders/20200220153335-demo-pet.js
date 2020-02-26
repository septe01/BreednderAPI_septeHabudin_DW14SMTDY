"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "pets",
      [
        {
          name: "faizal",
          gender: "male",
          about_pet: "he is very cute",
          photo: "i.imgur.com/ZWxoXZD.jpg",
          user_id: 2,
          spesies_id: 1,
          age_id: 2,
          createdAt: "0000-00-00",
          updatedAt: "0000-00-00"
        },
        {
          name: "faizal again",
          gender: "female",
          about_pet: "he was very excited",
          photo: "i.imgur.com/6kD5rw3.jpg",
          user_id: 2,
          spesies_id: 2,
          age_id: 3,
          createdAt: "0000-00-00",
          updatedAt: "0000-00-00"
        },
        {
          name: "faizals",
          gender: "male",
          about_pet: "he was very excited",
          photo: "i.imgur.com/a0cNgtL.jpg",
          user_id: 3,
          spesies_id: 1,
          age_id: 3,
          createdAt: "0000-00-00",
          updatedAt: "0000-00-00"
        },
        {
          name: "faizals",
          gender: "male",
          about_pet: "he was very excited",
          photo: "i.imgur.com/a0cNgtL.jpg",
          user_id: 3,
          spesies_id: 2,
          age_id: 2,
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
    return queryInterface.bulkDelete("pets", null, {});
  }
};

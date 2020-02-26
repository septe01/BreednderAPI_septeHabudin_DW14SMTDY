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
      "users",
      [
        {
          breeder: "septe habudin",
          email: "septe@gmail.com",
          password: "123456",
          phone: "0812 1322 1235",
          address: "Kp. Pabuaran No.26 Rt.03 Rw.953",
          role: "admin",
          createdAt: "0000-00-00",
          updatedAt: "0000-00-00"
        }
        // ,
        // {
        //   breeder: "habudin",
        //   email: "habudin@gmail.com",
        //   password: "123456",
        //   phone: "0812 1322 1235",
        //   address: "Kp. Pabuaran No.26 Rt.03 Rw.953",
        //   createdAt: "0000-00-00",
        //   updatedAt: "0000-00-00"
        // },
        // {
        //   breeder: "stia",
        //   email: "stia@gmail.com",
        //   password: "123456",
        //   phone: "0812 1322 1235",
        //   address: "Kp. Pabuaran No.26 Rt.03 Rw.953",
        //   createdAt: "0000-00-00",
        //   updatedAt: "0000-00-00"
        // }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("users", null, {});
  }
};

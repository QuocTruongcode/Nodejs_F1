'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // email: DataTypes.STRING,
    // password: DataTypes.STRING,
    // firstName: DataTypes.STRING,
    // lastName: DataTypes.STRING,
    // address: DataTypes.STRING,
    // gender: DataTypes.BOOLEAN,
    // roleid: DataTypes.STRING
    return queryInterface.bulkInsert('Users', [
      {

        email: 'penGame@gmail.com',
        password: '123456',
        firstName: 'Hang',
        lastName: 'Do Thi',
        address: 'Luong Tai- Bac Ninh',
        gender: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

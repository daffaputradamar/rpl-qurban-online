"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("users", "imagePath", Sequelize.STRING);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn("users", "imagePath");
  }
};

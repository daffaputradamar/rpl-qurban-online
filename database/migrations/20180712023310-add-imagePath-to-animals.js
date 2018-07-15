"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("Animals", "imagePath", Sequelize.STRING);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn("Animals", "imagePath");
  }
};

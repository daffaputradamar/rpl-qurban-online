"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("Proofs", "imagePath", Sequelize.STRING);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn("Proofs", "imagePath");
  }
};

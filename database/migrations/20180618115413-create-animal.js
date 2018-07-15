"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Animals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      jenis: {
        type: Sequelize.STRING
      },
      umur: {
        type: Sequelize.INTEGER
      },
      berat: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        }
      },
      mosqueId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Mosques",
          key: "id"
        }
      },
      proofId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Proofs",
          key: "id"
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Animals");
  }
};

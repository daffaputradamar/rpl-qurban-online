"use strict";
module.exports = (sequelize, DataTypes) => {
  var Proof = sequelize.define(
    "Proof",
    {
      pesan: DataTypes.TEXT,
      imagePath: DataTypes.STRING,
      animalId: DataTypes.INTEGER
    },
    {}
  );
  Proof.associate = function(models) {
    Proof.belongsTo(models.Mosque, {
      foreignKey: "mosqueId"
    }),
      Proof.belongsTo(models.User, {
        foreignKey: "userId"
      });
  };
  return Proof;
};

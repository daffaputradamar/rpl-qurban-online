"use strict";
module.exports = (sequelize, DataTypes) => {
  var Animal = sequelize.define(
    "Animal",
    {
      jenis: DataTypes.STRING,
      umur: DataTypes.INTEGER,
      berat: DataTypes.INTEGER,
      imagePath: DataTypes.STRING
    },
    {}
  );
  Animal.associate = function(models) {
    Animal.belongsTo(models.Mosque, {
      foreignKey: "mosqueId"
    }),
      Animal.belongsTo(models.User, {
        foreignKey: "userId"
      }),
      Animal.belongsTo(models.Proof, {
        foreignKey: "proofId"
      });
  };
  return Animal;
};

"use strict";
module.exports = (sequelize, DataTypes) => {
  var Mosque = sequelize.define(
    "Mosque",
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: DataTypes.STRING,
      alamat: DataTypes.STRING,
      phone: DataTypes.STRING,
      description: DataTypes.TEXT,
      imagePath: DataTypes.STRING
    },
    {}
  );
  Mosque.associate = function(models) {
    Mosque.hasMany(models.Animal, {
      foreignKey: "mosqueId"
    }),
      Mosque.hasMany(models.Proof, {
        foreignKey: "mosqueId"
      });
  };
  return Mosque;
};

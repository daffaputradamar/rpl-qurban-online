"use strict";
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    "User",
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
      phone: DataTypes.STRING,
      sex: DataTypes.CHAR,
      imagePath: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.Animal, {
      foreignKey: "userId"
    }),
      User.hasMany(models.Proof, {
        foreignKey: "userId"
      });
  };
  return User;
};

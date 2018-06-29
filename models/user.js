'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    sex: DataTypes.CHAR
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Animal, {
      foreignKey: 'userId'
    }),
    User.hasMany(models.Proof, {
      foreignKey: 'userId'
    })
  };
  return User;
};
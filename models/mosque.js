'use strict';
module.exports = (sequelize, DataTypes) => {
  var Mosque = sequelize.define('Mosque', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {});
  Mosque.associate = function(models) {
    Mosque.hasMany(models.Animal, {
      foreignKey: 'mosqueId'
    }),
    Mosque.hasMany(models.Proof, {
      foreignKey: 'mosqueId'
    })
  };
  return Mosque;
};
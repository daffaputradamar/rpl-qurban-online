'use strict';
module.exports = (sequelize, DataTypes) => {
  var Animal = sequelize.define('Animal', {
    jenis: DataTypes.STRING,
    umur: DataTypes.INTEGER,
    berat: DataTypes.INTEGER,
    sex: DataTypes.CHAR
  }, {});
  Animal.associate = function(models) {
    Animal.belongsTo(models.Mosque, {
      foreignKey: 'mosqueId'
    }),
    Animal.belongsTo(models.User, {
      foreignKey: 'userId'
    })
  }
  return Animal;
};
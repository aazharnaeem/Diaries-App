'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class diary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      diary.belongsTo(models.user,{
        foreignKey:'userId',
        as:'user',
      }),
      diary.hasMany(models.entry)
    }
  };
  diary.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    isPrivate: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'diary',
  });
  return diary;
};
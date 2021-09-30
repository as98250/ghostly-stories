const { title } = require('process');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Story extends Model {}

Story.init(
  {
    title:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    content:{
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    image:{
      type: DataTypes.STRING,
      defaultValue: "playground.jpeg",
    },
    user_id:{
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'story',
  }

)

module.exports = Story;

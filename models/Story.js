const { title } = require('process');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Story extends Model {}

Story.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    content:{
      type: DataTypes.STRING,
      allowNull: false,
      len: [4,2000],
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id:{
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    tag_id:{
      type: DataTypes.STRING,
      references: {
        model: 'tag',
        key: 'id'
      }
    },
    comment_id:{
      type: DataTypes.STRING,
      references: {
        model: 'comment',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }

)

module.exports = Story;

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class StoryTag extends Model {}

StoryTag.init(
  {
    story_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'story',
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'story_tag',
  }
);

module.exports = StoryTag;

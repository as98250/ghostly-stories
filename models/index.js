const User = require('./User.js');
const Story = require('./Story');
const Comment = require('./Comment');
const Tag = require('./Tag')

User.hasMany(Story, {
  foreignKey: 'user_id'
});

Tag.hasMany(Story, {
  foreignKey: 'tag_id'
});
Story.hasMany(Comment, {
  foreignKey: 'comment_id'
});

Story.belongsTo(User, {
  foreignKey: 'user_id',
  
});
Tag.belongsTo(Story, {
  foreignKey: 'tag_id',
  
});
Comment.belongsTo(Story, {
  foreignKey: 'comment_id',
  
});

module.exports = { User, Story };

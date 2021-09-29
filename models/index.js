const User = require('./User');
const Story = require('./Story');
const Comment = require('./Comment');
const Tag = require('./Tag')
const StoryTag = require('./StoryTag')

User.hasMany(Story, {
  foreignKey: 'user_id'
});

Story.belongsTo(User, {
  foreignKey: 'user_id',
  
});

Story.hasMany(Comment, {
  foreignKey: 'comment_id'
});

Comment.belongsTo(Story, {
  foreignKey: 'comment_id',
});

Tag.belongsToMany(Story, {
  through: StoryTag,
  foreignKey: 'tag_id'
});

Story.belongsToMany(Tag, {
  through: StoryTag,
  foreignKey: 'story_id',
});


module.exports = {User, Story, Comment, Tag, StoryTag};

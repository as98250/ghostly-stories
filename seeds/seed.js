const sequelize = require('../config/connection');
const { User, Comment, Story, Tag } = require('../models');

const userData = require('./userData.json');
const tagData = require('./tagData.json');
const storyData = require('./storyData.json');
const commentData = require('./commentData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Story.bulkCreate(storyData, {
    returning: true,
  });
  
  await Comment.bulkCreate(commentData, {
    returning: true,
  });
  process.exit(0);
};

seedDatabase();

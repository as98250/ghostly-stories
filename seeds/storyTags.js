const sequelize = require('../config/connection');
const { Story, Tag, StoryTag } = require('../models');

const init = async () => {
    await sequelize.sync({ force: false });

    const story = await Story.findByPk(process.argv[2], {
        include: {
            model: Tag,
            through: StoryTag
        }
    });

    await story.setTags(process.argv.slice(3));
    await story.save();
    console.log(story.get({ plain: true }));
    process.exit(0);
};

init();

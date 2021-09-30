const router = require('express').Router();
const { Story, StoryTag, Tag, User } = require('../models');

// Get all stories and Join with user data

//GET Route to grab homepage

router.get('/', async (req, res) => {
    try {
        // convert to a plain JSON object
        const storyData = await Story.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        //console.log(storyData);
        const stories = storyData.map(story => story.get({ plain: true }));
        console.log(stories);
        res.render('homepage', { stories });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/story/:story_id', async (req, res) => {
    try {
        const storyDataId = await StoryTag.findBy(req.params.story_id, {
            include: [
                {
                    model: Story,
                    attributes: ['title', 'content', 'image',],
                },
            ],
        });

        const story = storyDataId.get({ plain: true });

        res.render('story', { story });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});




module.exports = router;
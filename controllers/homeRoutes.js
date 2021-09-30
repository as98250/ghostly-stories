const router = require('express').Router();
const { Story, StoryTag, Tag, User, Comment } = require('../models');

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

router.get('/story/:id', async (req, res) => {
    try {
        const storyDataId = await Story.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username',],
                },
                {
                    model: Tag,
                    through: StoryTag,
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    attributes: ['description', 'story_id'],
                },
            ],
        });
        const story = storyDataId.get({ plain: true });
        console.log(story);
        res.render('story', { story });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/profile/:id', async (req, res) => {
    try {
        const profileData = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Story,
                    attributes: ['user_id', 'title'],
                },
            ],
        });
        const user = profileData.get({ plain: true });

        res.render('profile', { user });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});




module.exports = router;
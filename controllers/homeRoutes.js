const router = require('express').Router();
const {Story, StoryTag, Tag, User} = require('../models');

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
        res.render('homepage');
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
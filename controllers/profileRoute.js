const router = require('express').Router();
const { Story, User } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const storyData = await Story.findAll({
            where: {
                id: req.session.userId,
            },
        });

        const userData = await User.findOne({
            where: {
                id: req.session.userId,
            },
        });

        const stories = storyData.map((story) => story.get({ plain: true }));


        res.render('profile', { stories });
        
    } catch (err) {
        res.redirect('login');
    }
});

module.exports = router;
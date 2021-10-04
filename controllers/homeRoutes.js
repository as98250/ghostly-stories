const router = require('express').Router();
const { Story, StoryTag, Tag, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all stories and Join with user data

//GET Route to grab homepage

router.get('/', async (req, res) => {
    try {
        // convert to a plain JSON object
        const storyData = await Story.findAll(
            {
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    },
                ],
            }
        );

        const stories = storyData.map((story) => story.get({ plain: true }));
        res.render('homepage', { stories });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/story/:id', async (req, res) => {
    try {
        const storyDataId = await Story.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
                {
                    model: Tag,
                    through: StoryTag,
                },
            ],
        });
        if (storyDataId) {
            const story = storyDataId.get({ plain: true });
            res.render('story', { story });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    try {
        const storyData = await Story.findAll({
            where: {
                id: req.session.userId,
            },
            include: [
                User
            ]
        });

        const userData = await User.findOne(User.username);
        const stories = storyData.map((story) => story.get({ plain: true }));
        const users = userData.get( { plain: true });



        res.render('profile', { stories, users });

    } catch (err) {
        res.redirect('login');
    }
});

router.get('/edit/:id',withAuth, async (req, res) => {
    try {
      const storyData = await Story.findByPk(req.params.id);
  
      if (storyData) {
        const story = storyData.get({ plain: true });
  
        res.render('edit', {story});
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.redirect('login');
    }
  });
  


router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');

});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

module.exports = router;
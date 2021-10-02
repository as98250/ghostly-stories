const router = require('express').Router();
const { Story, StoryTag, Tag, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

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
        const stories = storyData.map((story) => story.get({ plain: true }));
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

router.get('/profile/:id', withAuth, async (req, res) => {
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
        // res.json(user);
        res.render('profile', {
            user,
            // loggedIn: true
        });
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
      });
  
      const stories = storyData.map((story) => story.get({ plain: true }));
  
      res.render('profile', { stories });
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
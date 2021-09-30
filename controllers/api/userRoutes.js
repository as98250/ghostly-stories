const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    if(!req.body.username){
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } else{
    res.status(400).json({ message: 'Username is taken, please try again' });
      return;
  }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'DENIED, try again please!' });
      return;
    }

    const acceptedPassword = user.checkPassword(req.body.password);

    if (!acceptedPassword) {
      res.status(400).json({ message: 'DENIED, try again please!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'Login successful' });
    });
  } catch (err) {
    res.status(400).json({ message: 'DENIED, try again please!' });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

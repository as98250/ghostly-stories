const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
      const comment = await Comment.create({
        ...req.body,
        username: req.session.username,
      });
      res.json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
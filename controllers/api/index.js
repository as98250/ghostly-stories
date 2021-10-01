const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./storyRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/stories', projectRoutes);
router.use('/comments', commentRoutes);

module.exports = router;

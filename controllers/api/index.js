const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./storyRoutes');

router.use('/users', userRoutes);
router.use('/stories', projectRoutes);

module.exports = router;

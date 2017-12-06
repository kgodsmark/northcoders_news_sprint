const router = require('express').Router();
const articlesRoutes = require('./articlesRoutes');
const topicsRoutes = require('./topicsRoutes');
const commentsRoutes = require('./commentsRoutes');
const userRoutes = require('./userRoutes');

router.use('/articles', articlesRoutes);
router.use('/topics', topicsRoutes);
router.use('/comments', commentsRoutes);
router.use('/users', userRoutes);

module.exports = router;

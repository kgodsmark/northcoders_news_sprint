const router = require('express').Router();
const { getAllArticles, getAllTopics, getAllArticlesByTopic } = require('../controllers/index');

router.get('/articles', getAllArticles);

router.get('/topics', getAllTopics);

router.get('/topics/:topic/articles', getAllArticlesByTopic);

module.exports = router;
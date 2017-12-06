const router = require('express').Router();
const { getAllTopics, getAllArticlesByTopic } = require('../controllers');

router.get('/', getAllTopics);

router.get('/:topic/articles', getAllArticlesByTopic);

module.exports = router;

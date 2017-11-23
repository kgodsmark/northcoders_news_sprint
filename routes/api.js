const router = require('express').Router();
const { getAllArticles, getAllTopics, getAllArticlesByTopic, getAllCommentsByArticle } = require('../controllers/index');

router.get('/articles', getAllArticles);

router.get('/topics', getAllTopics);

router.get('/topics/:topic/articles', getAllArticlesByTopic);

router.get('/articles/:article_id/comments', getAllCommentsByArticle);

module.exports = router;
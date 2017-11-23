const router = require('express').Router();
const { getAllArticles, getAllTopics, getAllArticlesByTopic, getAllCommentsByArticle, addCommentToArticle, changeArticleVotes, changeCommentVotes, deleteComment, getUserProfile } = require('../controllers/index');

router.get('/articles', getAllArticles);

router.get('/topics', getAllTopics);

router.get('/topics/:topic/articles', getAllArticlesByTopic);

router.get('/articles/:article_id/comments', getAllCommentsByArticle);

router.post('/articles/:article_id/comments', addCommentToArticle);

router.put('/articles/:article_id', changeArticleVotes);

router.put('/comments/:comment_id', changeCommentVotes);

router.delete('/comments/:comment_id', deleteComment);

router.get('/users/:username', getUserProfile);

module.exports = router;
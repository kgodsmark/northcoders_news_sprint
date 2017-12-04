const router = require('express').Router();
const articles = require('../controllers/articles');
const topics = require('../controllers/topics');
const comments = require('../controllers/comments');
const users = require('../controllers/users');


router.get('/articles', articles.getAllArticles);

router.get('/articles/:article_id', articles.getArticlebyID);

router.get('/topics/:topic/articles', articles.getAllArticlesByTopic);

router.patch('/articles/:article_id', articles.changeArticleVotes);

router.get('/users/:username/repos', articles.getUserPublicRepos);

router.get('/topics', topics.getAllTopics);

router.get('/articles/:article_id/comments', comments.getAllCommentsByArticle);

router.post('/articles/:article_id/comments', comments.addCommentToArticle);

router.patch('/comments/:comment_id', comments.changeCommentVotes);

router.delete('/comments/:comment_id', comments.deleteComment);

router.get('/users/:username', users.getUserProfile);

router.patch('/users/:username', users.changeUserProfile);

module.exports = router;
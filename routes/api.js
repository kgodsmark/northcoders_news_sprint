const router = require('express').Router();
const { getAllArticles, getAllTopics, getAllArticlesByTopic, getAllCommentsByArticle, addCommentToArticle, changeArticleVotes, changeCommentVotes, deleteComment, getUserProfile, getUserPublicRepos, getArticlebyID, changeUserProfile } = require('../controllers/index');

router.get('/articles', getAllArticles);

router.get('/articles/:article_id', getArticlebyID);

router.get('/topics', getAllTopics);

router.get('/topics/:topic/articles', getAllArticlesByTopic);

router.get('/articles/:article_id/comments', getAllCommentsByArticle);

router.post('/articles/:article_id/comments', addCommentToArticle);

router.patch('/articles/:article_id', changeArticleVotes);

router.patch('/comments/:comment_id', changeCommentVotes);

router.delete('/comments/:comment_id', deleteComment);

router.get('/users/:username', getUserProfile);

router.get('/users/:username/repos', getUserPublicRepos);

router.patch('/users/:username', changeUserProfile);

module.exports = router;
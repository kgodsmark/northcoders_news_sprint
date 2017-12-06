const router = require('express').Router();
const { getAllArticles, getArticlebyID, getAllCommentsByArticle, addCommentToArticle, changeArticleVotes } = require('../controllers');

router.get('/', getAllArticles);

router.get('/:article_id', getArticlebyID);

router.patch('/:article_id', changeArticleVotes);

router.get('/:article_id/comments', getAllCommentsByArticle);

router.post('/:article_id/comments', addCommentToArticle);

module.exports = router;

const router = require('express').Router();
const { changeCommentVotes, deleteComment } = require('../controllers');

router.patch('/:comment_id', changeCommentVotes);

router.delete('/:comment_id', deleteComment);

module.exports = router;

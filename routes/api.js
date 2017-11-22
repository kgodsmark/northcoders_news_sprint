const router = require('express').Router();
const { getAllArticles, getAllTopics } = require('../controllers/index');

router.get('/articles', getAllArticles);

router.get('/topics', getAllTopics);

module.exports = router;
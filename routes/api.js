const router = require('express').Router();
const { getAllArticles } = require('../controllers/index');

router.get('/articles', getAllArticles);


module.exports = router;
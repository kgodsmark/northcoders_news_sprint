const router = require('express').Router();
const { getUserProfile, getUserPublicRepos } = require('../controllers');

router.get('/:username', getUserProfile);

router.get('/:username/repos', getUserPublicRepos);

module.exports = router;

const mongoose = require('mongoose');
const { Articles, Comments, Users, Topics } = require('../models/models');

function getAllArticles(req, res, next) {
    return Articles.find()
            .then(articles => res.send({ articles }))
    .catch(err => next(err));
}

module.exports = { getAllArticles };

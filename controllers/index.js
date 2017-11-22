const mongoose = require('mongoose');
const { Articles, Comments, Users, Topics } = require('../models/models');

function getAllArticles(req, res, next) {
    return Articles.find()
            .then(articles => res.send({ articles }))
    .catch(err => next(err));
}

function getAllTopics(req, res, next) {
    return Topics.find()
        .then(topics => res.send({ topics }))
        .catch(err => next(err));
}


module.exports = { getAllArticles, getAllTopics };

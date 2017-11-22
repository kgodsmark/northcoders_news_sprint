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

function getAllArticlesByTopic(req, res, next) {
    return Articles.find({ belongs_to: req.params.topic })
        .then(article => {
            if (article.length < 1) next({ type: 404 });
            res.send({ article })
        })
        .catch(err => {
            next(err)
        });
}


module.exports = { getAllArticles, getAllTopics, getAllArticlesByTopic };

const mongoose = require('mongoose');
const { Articles, Comments, Users, Topics } = require('../models/models');

function getAllArticles(req, res, next) {
    return Articles.find().sort({votes: -1}).limit(15)
        .then(articles => res.send({ articles }))
        .catch(err => next(err));
}

function getArticlebyID(req, res, next) {
    return Articles.find({ _id: req.params.article_id })
        .then(article => {
            if (article.length < 1) return next({ type: 404 });
            res.send({ article })
        })
        .catch(err => {
            next(err)
        });
}

function getAllTopics(req, res, next) {
    return Topics.find()
        .then(topics => res.send({ topics }))
        .catch(err => next(err));
}

function getAllArticlesByTopic(req, res, next) {
    return Articles.find({ belongs_to: req.params.topic }).sort({votes: -1})
        .then(articles => {
            if (articles.length < 1) return next({ type: 404 });
            res.send({ articles })
        })
        .catch(err => {
            next(err)
        });
}

function getAllCommentsByArticle(req, res, next) {
    return Comments.find({ belongs_to: req.params.article_id }).sort({created_at: -1})
        .then(comments => {
            res.send({ comments })
        })
        .catch(err => {
            if (err.name === 'CastError') return next({ err, type: 404 });
            next(err)
        });
}

function addCommentToArticle(req, res, next) {
    const newComment = new Comments({ body: req.body.body, belongs_to: req.body.belongs_to, created_by: req.body.created_by })
    return newComment.save()
        .then((comment) => {
            return Comments.find({ belongs_to: comment.belongs_to }).sort({created_at: -1})
        })
        .then((comments) => {
            res.status(201).send({ comments });
        })
        .catch((err) => {
            if (err.name === 'ValidationError') return next({ err, type: 400 });
            next(err)
        });

}

function changeArticleVotes(req, res, next) {
    let increment = 0;
    if (req.query.vote === 'up') increment++;
    if (req.query.vote === 'down') increment--;
    return Articles.findByIdAndUpdate(req.params.article_id, { $inc: { votes: increment } }, { new: true })
        .then((article) => {
            res.send({ article: [article] });
        })
        .catch(err => {
            next(err);
        });
}

function changeCommentVotes(req, res, next) {
    let increment = 0;
    if (req.query.vote === 'up') increment++;
    if (req.query.vote === 'down') increment--;
    return Comments.findByIdAndUpdate(req.params.comment_id, { $inc: { votes: increment } }, { new: true })
        .then((comment) => {
            return Comments.find({ belongs_to: comment.belongs_to }).sort({created_at: -1})
        })
        .then((comments) => {
            res.send({ comments });
        })
        .catch(err => {
            next(err);
        });
}


function deleteComment(req, res, next) {
    return Comments.findByIdAndRemove(req.params.comment_id)
        .then((comment) => {
            return Comments.find({ belongs_to: comment.belongs_to }).sort({created_at: -1})
        })
        .then((comments) => {
            res.status(202).send({ comments })
        })
        .catch(err => {
            if (err.name === 'CastError') return next({ err, type: 404 });
            next(err)
        });
}

function getUserProfile(req, res, next) {
    return Users.find({ username: req.params.username })
        .then(user => {
            if (user.length === 0) return next({ type: 404 });
            res.send({ user })
        })
        .catch(err => {
            next(err)
        });
}

function getUserPublicRepos(req, res, next) {
    return Articles.find({ created_by: req.params.username })
        .then(articles => {
            if (articles.length === 0) return next({ type: 404 });
            res.send({ articles });
        })
        .catch(err => {
            next(err);
        });
}

function changeUserProfile(req, res, next) {
    return Users.findByIdAndUpdate(req.params.username, { $set:{avatar_url: req.body.url } }, { new: true })
        .then((user) => {
            return Users.find({username: req.params.username })
        })
        .then(user => {
            if (user.length === 0) return next({ type: 404 });
            res.send({ user })
        })
        .catch(err => {
            next(err)
        });
}

module.exports = { getAllArticles, getAllTopics, getAllArticlesByTopic, getAllCommentsByArticle, addCommentToArticle, changeArticleVotes, changeCommentVotes, deleteComment, getUserProfile, getUserPublicRepos, getArticlebyID, changeUserProfile };

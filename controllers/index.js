const mongoose = require('mongoose');
const { Articles, Comments, Users, Topics } = require('../models/models');

function getAllArticles(req, res, next) {
    return Articles.find()
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
    return Articles.find({ belongs_to: req.params.topic })
        .then(article => {
            if (article.length < 1) return next({ type: 404 });
            res.send({ article })
        })
        .catch(err => {
            next(err)
        });
}

function getAllCommentsByArticle(req, res, next) {
    return Comments.find({
        belongs_to: req.params.article_id
    })
        .then(comments => {
            res.send({ comments })
        })
        .catch(err => {
            if (err.name === 'CastError') return next({ err, type: 404 });
            next(err)
        });
}

function addCommentToArticle(req, res, next) {
    let newComment = new Comments({ body: req.body.body, belongs_to: req.params.article_id, created_by: 'northcoders' }).save()
        .then((comment) => {
            return Comments.find({ belongs_to: comment.belongs_to })
        })
        .then((comments) => {
            res.status(201).send(comments);
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
            res.send(article);
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
            res.send(comment);
        })
        .catch(err => {
            next(err);
        });
}

function deleteComment(req, res, next) {
    return Comments.findByIdAndRemove(req.params.comment_id)
        .then((data) => res.status(202).send({ comment_deleted: data }))
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

module.exports = { getAllArticles, getAllTopics, getAllArticlesByTopic, getAllCommentsByArticle, addCommentToArticle, changeArticleVotes, changeCommentVotes, deleteComment, getUserProfile, getUserPublicRepos, getArticlebyID };

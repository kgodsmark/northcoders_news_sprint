const { Articles } = require('../models/models');


module.exports = {
    getAllArticles(req, res, next) {
        return Articles.find().sort({ votes: -1 }).limit(15)
            .then(articles => {
                res.send({ articles });
                next();
            })
            .catch(err => next(err));
    },

    getArticlebyID(req, res, next) {
        return Articles.find({ _id: req.params.article_id })
            .then(article => {
                if (article.length < 1) return next({ type: 404 });
                res.send({ article });
                next();
            })
            .catch(err => {
                if (err.name === 'CastError') return next({ err, type: 400 });
                next(err);
            });
    },

    getAllArticlesByTopic(req, res, next) {
        return Articles.find({ belongs_to: req.params.topic }).sort({ votes: -1 })
            .then(articles => {
                if (articles.length < 1) return next({ type: 404 });
                res.send({ articles });
                next();
            })
            .catch(err => {
                next(err)
            });
    },

    changeArticleVotes(req, res, next) {
        let increment = 0;
        if (req.query.vote === 'up') increment++;
        if (req.query.vote === 'down') increment--;
        return Articles.findByIdAndUpdate(req.params.article_id, { $inc: { votes: increment } }, { new: true })
            .then((article) => {
                res.send({ article: [article] });
                next();
            })
            .catch(err => {
                if (err.name === 'CastError') return next({ err, type: 400 });
                next(err);
            });
    },

    getUserPublicRepos(req, res, next) {
        return Articles.find({ created_by: req.params.username })
            .then(articles => {
                if (articles.length === 0) return next({ type: 404 });
                res.send({ articles });
                next();
            })
            .catch(err => {
                next(err);
            });
    }
};

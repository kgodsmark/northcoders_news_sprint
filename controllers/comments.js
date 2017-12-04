const { Comments } = require('../models/models');

module.exports = {
    getAllCommentsByArticle(req, res, next) {
        return Comments.find({ belongs_to: req.params.article_id }).sort({ created_at: -1 })
            .then(comments => {
                res.send({ comments });
                next();
            })
            .catch(err => {
                if (err.name === 'CastError') return next({ err, type: 400 });
                next(err)
            });
    },

    addCommentToArticle(req, res, next) {
        const newComment = new Comments({ body: req.body.body, belongs_to: req.body.belongs_to, created_by: req.body.created_by })
        return newComment.save()
            .then((comment) => {
                return Comments.find({ belongs_to: comment.belongs_to }).sort({ created_at: -1 })
            })
            .then((comments) => {
                res.status(201).send({ comments });
            })
            .catch((err) => {
                if (err.name === 'ValidationError') return next({ err, type: 400 });
                next(err)
            });
    },


    changeCommentVotes(req, res, next) {
        let increment = 0;
        if (req.query.vote === 'up') increment++;
        if (req.query.vote === 'down') increment--;
        return Comments.findByIdAndUpdate(req.params.comment_id, { $inc: { votes: increment } }, { new: true })
            .then((comment) => {
                return Comments.find({ belongs_to: comment.belongs_to }).sort({ created_at: -1 })
            })
            .then((comments) => {
                res.send({ comments });
                next();
            })
            .catch(err => {
                next(err);
            });
    },


    deleteComment(req, res, next) {
        return Comments.findByIdAndRemove(req.params.comment_id)
            .then((comment) => {
                return Comments.find({ belongs_to: comment.belongs_to }).sort({ created_at: -1 })
            })
            .then((comments) => {
                res.status(202).send({ comments });
                next();
            })
            .catch(err => {
                if (err.name === 'CastError') return next({ err, type: 400 });
                next(err)
            });
    }

};

const { Topics } = require('../models');

module.exports = {
    getAllTopics(req, res, next) {
        return Topics.find()
            .then(topics => {
                if (topics.length < 1) return next({ type: 404 });
                res.send({ topics });
                next();
            })
            .catch(err => next(err));
    }
};

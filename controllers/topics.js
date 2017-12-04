const { Topics } = require('../models/models');

module.exports = {
    getAllTopics(req, res, next) {
        return Topics.find()
            .then(topics => {
                res.send({ topics });
                next();
            })
            .catch(err => next(err));
    }
};

const { Users } = require('../models');

module.exports = {
    getUserProfile(req, res, next) {
        return Users.find({ username: req.params.username })
            .then(user => {
                if (user.length === 0) return next({ type: 404 });
                res.send({ user });
                next();
            })
            .catch(err => {
                next(err);
            });
    }
};


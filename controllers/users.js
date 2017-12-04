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
    },
    changeUserProfile(req, res, next) {
        return Users.findByIdAndUpdate(req.params.username, { $set: { avatar_url: req.body.url } }, { new: true })
            .then((user) => {
                return Users.find({ username: req.params.username });
            })
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


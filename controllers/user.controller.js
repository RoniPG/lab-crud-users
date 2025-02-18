const User = require('../models/user.model');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
    const criteria = {};
    const olderthan = req.query.olderthan;
    
    if (olderthan) {
        const thisYear = new Date().getFullYear();
        const yearToFindLess = thisYear - Number(req.query.olderthan);
        criteria.birthdate = { $lt: new Date(`${yearToFindLess}`) };
    }
    User.find( criteria )
        .then(users => res.json(users))
        .catch(next);
}

module.exports.create = (req, res, next) => {
    const { name, email, password, birthdate, bio, avatar } = req.body;
    const permitedBody = { name, email, password, birthdate, bio, avatar };

    User.create(permitedBody)
        .then(user => res.status(201).json(user))
        .catch(next);
}

module.exports.update = (req, res, next) => {
    const { id } = req.params;

    User.findOne({ _id: id })
        .then(user => {
            if (!user) {
                next(createError(404, 'User not found'));
            } else {
                Object.assign(user, req.body);
                user.save()
                    .then(user => res.json(user))
                    .catch(next);
            }
        })
        .catch(next);
}

module.exports.delete = (req, res, next) => {
    const { id } = req.params;

    User.findOneAndDelete({ _id: id })
        .then(user => {
            if (!user) {
                next(createError(404, 'User not found'));
            } else {
                res.status(204).json();
            }
        })
        .catch(next);
}

module.exports.detail = (req, res, next) => {
    const { id } = req.params;

    User.findOne({ _id: id })
        .then(user => {
            if (!user) {
                next(createError(404, 'User not found'));
            } else {
                res.json(user);
            }
        })
        .catch(next);
}
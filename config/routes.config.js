const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const routes = express.Router();
const usersController = require('../controllers/user.controller');

routes.get('/users', usersController.list);
routes.post('/users', usersController.create);
routes.patch('/users/:id', usersController.update);
routes.delete('/users/:id', usersController.delete);
routes.get('/users/:id', usersController.detail);

routes.use((req, res, next) => {
    next(createError(404, 'Not Found'));
});

routes.use((err, req, res, next) => {
    console.log(err);
    
    if (err instanceof mongoose.Error.ValidationError) err = createError(400, err);
    else if (err instanceof mongoose.Error.CastError && err.message.includes('_id')) err = createError(404, 'Resource not found');
    // else if (err instanceof SyntaxError) err = createError(400, 'Invalid JSON');
    else if (err.message.includes('E11000')) err = createError(409, 'Email already registered');
    else if (!err.status) err = createError(500, err.message);
    const data = {};
    data.message = err.message;
    if (err.errors) {
        data.errors = Object.keys(err.errors).reduce((errors, key) => {
            errors[key] = err.errors[key].message;
            return errors;
        }, {});
    }
    res.status(err.status).json(data);
});

module.exports = routes;
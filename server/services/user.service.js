'use strict';
const userModel = require('../models/user.model');


class UserService {
  getUsers(req, res, next) {
    userModel.getUsers(res.locals.userId, req.query).then((users) => {
      res.json(users);
    }).catch(error => next(error));
  }
  getUser(req, res, next) {
    userModel.getUser(req.params.id).then((user) => {
      res.json(user);
    }).catch(error => next(error));
  }
  editUser(req, res, next) {
    userModel.editUser(req.params.id, req.body).then((user) => {
      res.json(user);
    }).catch(error => next(error));
  }
  deleteUsers(req, res, next) {
    userModel.deleteUsers(req.params.id).then((user) => {
      res.json(user);
    }).catch(error => next(error));
  }
}

module.exports = new UserService();

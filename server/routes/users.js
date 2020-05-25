const express = require('express'),
  router = express.Router(),
  auth = require('../middlewares/auth.middleware'),
  userService = require('../services/user.service'),
  authService = require('../services/auth.service');

router.get('/', auth, userService.getUsers);

router.post('/', authService.register);

router.delete('/:id', auth, userService.deleteUsers);

router.get('/:id', auth, userService.getUser);

router.put('/:id', auth, userService.editUser);

router.post('/register', authService.register);

router.post('/login', authService.login);

module.exports = router;

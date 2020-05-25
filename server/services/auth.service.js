'use strict';
const
  gravatar = require('gravatar'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  passport = require('passport'),
  validateRegisterInput = require('../validation/register'),
  validateLoginInput = require('../validation/login'),
  auth_config = require('../config/auth.config'),
  error_config = require('../config/error.config'),
  crypto = require('crypto'),
  UserSchema = require('../schemas/user.schema');


class AuthService {
  register(req, res, next) {
    const {errors, isValid} = validateRegisterInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
    UserSchema.findOne({
      email: req.body.email
    }).then(user => {
      if (user) {
        return res.status(400).json({
          email: 'Email already exists'
        });
      }
      else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });
        const newUser = new UserSchema({
          name: req.body.name,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          sex: req.body.sex,
          color: req.body.color,
          avatar
        });
      
        bcrypt.genSalt(10, (err, salt) => {
          if (err) console.error('There was an error', err);
          else {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) console.error('There was an error', err);
              else {
                newUser.password = hash;
                newUser
                .save()
                .then(user => {
                  res.json(user)
                });
              }
            });
          }
        });
      }
    });
  }
  login(req, res, next) {
  
    const {errors, isValid} = validateLoginInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const email = req.body.email;
    const password = req.body.password;
  
    UserSchema.findOne({email})
    .then(user => {
      if (!user) {
        errors.email = 'User not found'
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            avatar: user.avatar
          }
          return AuthService.generate_jwt(payload).then((token, error) => {
            if (error) console.error('There is some error in token', error);
            else {
              res.json({
                success: true,
                token: `Bearer ${token.jwt}`
              });
            }
          });
        }
        else {
          errors.password = 'Incorrect Password';
          return res.status(400).json(errors);
        }
      });
    });
  }
  static generate_jwt(payload) {
    return Promise.try(() => jwt.sign(
      {...payload, timestamp: Date.now()},
      auth_config.jwt.secret,
      {expiresIn: auth_config.jwt.exp}
    )).then(async jwt => {
      let r_token = AuthService.generate_token(auth_config.r_token.size);
      return {jwt, r_token};
    });
  }
  
  static generate_token(length = 12) {
    return new Promise((resolve, reject) => {
      if (process.env.NODE_ENV === 'test') return resolve('test_hhwgqdfvargcftvvqctgqvtqdtcwrgszefgr_test');
      crypto.randomBytes(length, (err, buffer) => {
        if (err) return reject(err);
        return resolve(buffer.toString('hex'));
      });
    });
  }
}

module.exports = new AuthService();

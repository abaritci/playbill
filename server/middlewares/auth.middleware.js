'use strict';

const jwt = require('jsonwebtoken'),
  auth_config = require('../config/auth.config'),
  error_config = require('../config/error.config');


module.exports = (req, res, next) => {
  let token = req.headers['authorization'];
  
  if (typeof token === 'undefined') {
    return res.status(401).json({errors: [error_config.jwtNotExists]}).end();
  }
  
  let bearer = token.split(' ');
  if (bearer[0].toLowerCase() !== 'bearer' || typeof bearer[1] === 'undefined') {
    return res.status(401).json({error: error_config.bearerInvalid}).end();
  }
  
  token = bearer[1];
  
  return Promise.try(() => {
    return jwt.verify(token, auth_config.jwt.secret)
  }).
  then(token_data => {
    res.locals.userId = token_data.id;
    return next();
  }).
  catch(jwt.JsonWebTokenError, () => {
    res.status(401).json({error: error_config.jsonWebTokenError}).end();
  }).
  catch(jwt.TokenExpiredError, () => {
    res.status(401).json({error: error_config.tokenExpiredError}).end();
  }).
  catch(err => next(err));
};

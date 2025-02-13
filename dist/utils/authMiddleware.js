"use strict";

var jwt = require('jsonwebtoken');
var API_SECRET_KEY = process.env.API_SECRET_KEY;
var authMiddleware = function authMiddleware(req, res, next) {
  var _req$headers$authoriz;
  var token = (_req$headers$authoriz = req.headers.authorization) === null || _req$headers$authoriz === void 0 ? void 0 : _req$headers$authoriz.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: 'No token provided',
      status: 'error'
    });
  }
  try {
    var decoded = jwt.verify(token, API_SECRET_KEY);
    req.user_id = decoded.data.id;
    req.role_id = decoded.data.role_id;
    req.doctor_id = decoded.data.doctor_id;
    console.log('Decoded JWT:', decoded);
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token',
      status: 'error'
    });
  }
};
module.exports = authMiddleware;
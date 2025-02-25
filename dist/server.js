"use strict";

var express = require('express');
var cors = require('cors');
var multer = require('multer');
var path = require('path');
var usersRoutes = require('./routes/usersRoutes');
var medicinesRoutes = require('./routes/medicinesRoutes');
var bodyTestRoutes = require('./routes/bodyTestRoutes');
var bookingRoutes = require('./routes/bookingRoutes');
var prescriptionRoutes = require('./routes/prescriptionRoutes');
var contactInquiryRoutes = require('./routes/contactInquiryRoutes');
var feedbackRoutes = require('./routes/feedbackRoutes');
require('dotenv').config();
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
app.use('/uploads', express["static"](path.join(__dirname, '../public/uploads')));
app.use(cors({
  origin: true,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  exposedHeaders: 'Content-Length,X-Kuma-Revision',
  credentials: true,
  maxAge: 600
}));
var upload = multer();
app.use(function (req, res, next) {
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/api/users', usersRoutes);
app.use('/api/medicines', medicinesRoutes);
app.use('/api/bodytest', bodyTestRoutes);
app.use('/api/book-appointment', bookingRoutes);
app.use('/api/prescription', prescriptionRoutes);
app.use('/api/contact-inquiry', contactInquiryRoutes);
app.use('/api/feedback', feedbackRoutes);
app.get('/', function (req, res) {
  res.send('api working!');
});
app.listen(port, function () {
  console.log("Server running on ".concat(process.env.NEXT_PUBLIC_API_URL));
});
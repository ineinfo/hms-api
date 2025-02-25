"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// src/routes/userRoutes.js
var express = require("express");
var bcrypt = require("bcryptjs");
var nodemailer = require('nodemailer');
var jwt = require("jsonwebtoken");
var TABLE = require("../utils/tables");
var pool = require("../utils/db");
var _require = require("../utils/common"),
  checkEmailExistOrNot = _require.checkEmailExistOrNot,
  validatePassword = _require.validatePassword,
  validateEmail = _require.validateEmail,
  formatDateForDB = _require.formatDateForDB,
  validatePhone = _require.validatePhone,
  generateOTP = _require.generateOTP;
var router = express.Router();
var authMiddleware = require("../utils/authMiddleware");
var API_SECRET_KEY = process.env.API_SECRET_KEY;
var API_TOKEN_EXPIRESIN = process.env.API_TOKEN_EXPIRESIN;

// Register both doctor, patients - eithout booking code
router.post("/", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, role, first_name, last_name, email, phone, password, age, dob, address, doctor_id, speciality, fees, emailExists, hashedPassword, userId, userDetails, patientInsertResult, _yield$pool$query, _yield$pool$query2, existingDoctor, doctorInsertResult;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, role = _req$body.role, first_name = _req$body.first_name, last_name = _req$body.last_name, email = _req$body.email, phone = _req$body.phone, password = _req$body.password, age = _req$body.age, dob = _req$body.dob, address = _req$body.address, doctor_id = _req$body.doctor_id, speciality = _req$body.speciality, fees = _req$body.fees;
          if (!(!role || !first_name || !last_name || !email || !phone || !password)) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "Role, First Name, Last Name, Email, Phone, and Password are required fields",
            status: false
          }));
        case 4:
          if (validatePhone(phone)) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "Phone number must be 10 digits",
            status: false
          }));
        case 6:
          if (validateEmail(email)) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "Invalid email format. Please enter a valid email like abc@gmail.com",
            status: false
          }));
        case 8:
          if (formatDateForDB(dob)) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "Invalid date format. Please enter a valid date ",
            status: false
          }));
        case 10:
          _context.next = 12;
          return checkEmailExistOrNot(role === "patient" ? TABLE.PATIENTS_TABLE : TABLE.DOCTORS_TABLE, email);
        case 12:
          emailExists = _context.sent;
          if (!emailExists) {
            _context.next = 15;
            break;
          }
          return _context.abrupt("return", res.status(409).json({
            error: "Email already exists, do login",
            status: false
          }));
        case 15:
          if (validatePassword(password)) {
            _context.next = 17;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "Password must be at least 9 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.",
            status: false
          }));
        case 17:
          _context.next = 19;
          return bcrypt.hash(password, 10);
        case 19:
          hashedPassword = _context.sent;
          userId = null;
          userDetails = null;
          if (!(role === "patient")) {
            _context.next = 32;
            break;
          }
          if (!(!age || !dob || !address)) {
            _context.next = 25;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "Age, Date of Birth, and Address are required for patients",
            status: false
          }));
        case 25:
          _context.next = 27;
          return pool.query("INSERT INTO ".concat(TABLE.PATIENTS_TABLE, " (first_name, last_name, email, phone, password, age, dob, address) \n                VALUES (?, ?, ?, ?, ?, ?, ?, ?)"), [first_name, last_name, email, phone, hashedPassword, age, dob, address]);
        case 27:
          patientInsertResult = _context.sent;
          userId = patientInsertResult[0].insertId;
          userDetails = {
            role: role,
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone: phone,
            age: age,
            dob: dob,
            address: address,
            p_id: userId
          };
          _context.next = 50;
          break;
        case 32:
          if (!(role === "doctor")) {
            _context.next = 49;
            break;
          }
          if (!(!doctor_id || !speciality)) {
            _context.next = 35;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "Doctor ID and Speciality are required for doctors",
            status: false
          }));
        case 35:
          _context.next = 37;
          return pool.query("SELECT * FROM ".concat(TABLE.DOCTORS_TABLE, " WHERE doctor_id = ? AND speciality = ?"), [doctor_id, speciality]);
        case 37:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = _slicedToArray(_yield$pool$query, 1);
          existingDoctor = _yield$pool$query2[0];
          if (!(existingDoctor.length > 0)) {
            _context.next = 42;
            break;
          }
          return _context.abrupt("return", res.status(409).json({
            error: "Doctor with ID ".concat(doctor_id, " and speciality ").concat(speciality, " is already registered"),
            status: false
          }));
        case 42:
          _context.next = 44;
          return pool.query("INSERT INTO ".concat(TABLE.DOCTORS_TABLE, " (first_name, last_name, email, phone, password, dob, age, doctor_id, speciality, fees) \n                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"), [first_name, last_name, email, phone, hashedPassword, dob, age, doctor_id, speciality, fees]);
        case 44:
          doctorInsertResult = _context.sent;
          userId = doctorInsertResult[0].insertId;
          userDetails = {
            role: role,
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone: phone,
            dob: dob,
            age: age,
            doctor_id: doctor_id,
            speciality: speciality,
            d_id: userId
          };
          _context.next = 50;
          break;
        case 49:
          return _context.abrupt("return", res.status(400).json({
            error: 'Role must be either "patient" or "doctor"',
            status: false
          }));
        case 50:
          return _context.abrupt("return", res.status(201).json({
            message: "User successfully registered",
            status: true,
            user: userDetails
          }));
        case 53:
          _context.prev = 53;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            error: "Server error",
            status: false
          }));
        case 57:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 53]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

//login patients
router.post("/login", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, email, password, _yield$pool$query3, _yield$pool$query4, rows, user, storedHashedPassword, passwordMatch, token;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          if (!(!email || !password)) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            error: "Email and Password field must be required",
            status: false
          }));
        case 4:
          _context2.next = 6;
          return pool.query("SELECT * FROM ".concat(TABLE.PATIENTS_TABLE, " WHERE email = ? AND status = 1"), [email]);
        case 6:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = _slicedToArray(_yield$pool$query3, 1);
          rows = _yield$pool$query4[0];
          if (!(rows.length > 0)) {
            _context2.next = 21;
            break;
          }
          user = rows[0];
          storedHashedPassword = user.password;
          _context2.next = 14;
          return bcrypt.compare(password, storedHashedPassword);
        case 14:
          passwordMatch = _context2.sent;
          if (!passwordMatch) {
            _context2.next = 20;
            break;
          }
          token = jwt.sign({
            data: user
          }, API_SECRET_KEY, {
            expiresIn: API_TOKEN_EXPIRESIN
          });
          return _context2.abrupt("return", res.status(200).json({
            accessToken: token,
            user: user,
            message: "Login Successfully",
            status: true
          }));
        case 20:
          return _context2.abrupt("return", res.status(401).json({
            error: "Invalid User ID or Password",
            status: false
          }));
        case 21:
          return _context2.abrupt("return", res.status(404).json({
            error: "User ID does not exist or Invalid User",
            status: false
          }));
        case 24:
          _context2.prev = 24;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).json({
            error: "Error occurred: ".concat(_context2.t0.message),
            status: false
          }));
        case 27:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 24]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

// Doctor login
router.post("/doctor-login", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body3, doctor_id, password, _yield$pool$query5, _yield$pool$query6, rows, doctor, storedHashedPassword, passwordMatch, token;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body3 = req.body, doctor_id = _req$body3.doctor_id, password = _req$body3.password;
          if (!(!doctor_id || !password)) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            error: "Doctor ID and Password field must be required",
            status: false
          }));
        case 4:
          _context3.next = 6;
          return pool.query("SELECT * FROM ".concat(TABLE.DOCTORS_TABLE, " WHERE doctor_id = ? AND status = 1"), [doctor_id]);
        case 6:
          _yield$pool$query5 = _context3.sent;
          _yield$pool$query6 = _slicedToArray(_yield$pool$query5, 1);
          rows = _yield$pool$query6[0];
          if (!(rows.length > 0)) {
            _context3.next = 21;
            break;
          }
          doctor = rows[0];
          storedHashedPassword = doctor.password;
          _context3.next = 14;
          return bcrypt.compare(password, storedHashedPassword);
        case 14:
          passwordMatch = _context3.sent;
          if (!passwordMatch) {
            _context3.next = 20;
            break;
          }
          token = jwt.sign({
            data: doctor
          }, API_SECRET_KEY, {
            expiresIn: API_TOKEN_EXPIRESIN
          });
          return _context3.abrupt("return", res.status(200).json({
            accessToken: token,
            doctor: _objectSpread(_objectSpread({}, doctor), {}, {
              password: ""
            }),
            message: "Login Successfully",
            status: true
          }));
        case 20:
          return _context3.abrupt("return", res.status(401).json({
            error: "Invalid Doctor ID or Password",
            status: false
          }));
        case 21:
          return _context3.abrupt("return", res.status(404).json({
            error: "Doctor ID does not exist or Invalid Doctor",
            status: false
          }));
        case 24:
          _context3.prev = 24;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(500).json({
            error: "Error occurred: ".concat(_context3.t0.message),
            status: false
          }));
        case 27:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 24]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

//get all doctors and specific doctors
router.get("/doctor/:id?", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id, _yield$pool$query7, _yield$pool$query8, doctor, _yield$pool$query9, _yield$pool$query10, doctors;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          console.log("Fetching doctor with ID:", id);
          if (!id) {
            _context4.next = 13;
            break;
          }
          _context4.next = 6;
          return pool.query("SELECT * FROM ".concat(TABLE.DOCTORS_TABLE, " WHERE id = ? AND status = 1"), [id]);
        case 6:
          _yield$pool$query7 = _context4.sent;
          _yield$pool$query8 = _slicedToArray(_yield$pool$query7, 1);
          doctor = _yield$pool$query8[0];
          console.log("Doctor found:", doctor);
          if (!(doctor.length > 0)) {
            _context4.next = 12;
            break;
          }
          return _context4.abrupt("return", res.status(200).json({
            data: doctor[0],
            message: "Record successfully fetched",
            status: true
          }));
        case 12:
          return _context4.abrupt("return", res.status(404).json({
            error: "Doctor not found",
            status: false
          }));
        case 13:
          _context4.next = 15;
          return pool.query("SELECT * FROM ".concat(TABLE.DOCTORS_TABLE, " WHERE status = 1"));
        case 15:
          _yield$pool$query9 = _context4.sent;
          _yield$pool$query10 = _slicedToArray(_yield$pool$query9, 1);
          doctors = _yield$pool$query10[0];
          console.log("Doctors found:", doctors);
          return _context4.abrupt("return", res.status(200).json({
            data: doctors,
            message: "Records successfully fetched",
            status: true,
            count: doctors.length
          }));
        case 22:
          _context4.prev = 22;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          return _context4.abrupt("return", res.status(500).json({
            error: "Server error",
            status: false
          }));
        case 26:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 22]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

//get all patiens and specific
router.get("/patients/:id?", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var id, _yield$pool$query11, _yield$pool$query12, patient, _yield$pool$query13, _yield$pool$query14, patients;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          if (!id) {
            _context5.next = 11;
            break;
          }
          _context5.next = 5;
          return pool.query("SELECT * FROM ".concat(TABLE.PATIENTS_TABLE, " WHERE id = ? AND status = 1"), [id]);
        case 5:
          _yield$pool$query11 = _context5.sent;
          _yield$pool$query12 = _slicedToArray(_yield$pool$query11, 1);
          patient = _yield$pool$query12[0];
          if (!(patient.length > 0)) {
            _context5.next = 10;
            break;
          }
          return _context5.abrupt("return", res.status(200).json({
            data: patient[0],
            message: "Record Successfully Fetched",
            status: true
          }));
        case 10:
          return _context5.abrupt("return", res.status(404).json({
            error: "Patient not found",
            status: false
          }));
        case 11:
          _context5.next = 13;
          return pool.query("SELECT * FROM ".concat(TABLE.PATIENTS_TABLE, " WHERE status = 1"));
        case 13:
          _yield$pool$query13 = _context5.sent;
          _yield$pool$query14 = _slicedToArray(_yield$pool$query13, 1);
          patients = _yield$pool$query14[0];
          return _context5.abrupt("return", res.status(200).json({
            data: patients,
            message: "Records successfully fetched",
            status: true,
            count: patients.length
          }));
        case 19:
          _context5.prev = 19;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            error: "Server error",
            status: false
          }));
        case 23:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 19]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

//delete doctors
router["delete"]("/doctor/:id", authMiddleware, /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var idParam, deletedIds, query, _yield$pool$query15, _yield$pool$query16, results;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          idParam = req.params.id;
          deletedIds = idParam ? idParam.split(",") : [];
          if (!(!deletedIds || deletedIds.length === 0)) {
            _context7.next = 5;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            error: "RowID must be required",
            status: false
          }));
        case 5:
          _context7.next = 7;
          return Promise.all(deletedIds.map(/*#__PURE__*/function () {
            var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(deletedId) {
              return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return pool.query("SELECT * FROM ".concat(TABLE.DOCTORS_TABLE, " WHERE status = 1 and id = ?"), [deletedId]);
                  case 2:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6);
            }));
            return function (_x13) {
              return _ref7.apply(this, arguments);
            };
          }()));
        case 7:
          query = "UPDATE ".concat(TABLE.DOCTORS_TABLE, " SET status = 0, deleted_at = NOW() WHERE id IN (?)");
          _context7.next = 10;
          return pool.query(query, [deletedIds]);
        case 10:
          _yield$pool$query15 = _context7.sent;
          _yield$pool$query16 = _slicedToArray(_yield$pool$query15, 1);
          results = _yield$pool$query16[0];
          if (!(results.affectedRows > 0)) {
            _context7.next = 15;
            break;
          }
          return _context7.abrupt("return", res.status(200).json({
            message: "Record Successfully Deleted",
            status: true
          }));
        case 15:
          return _context7.abrupt("return", res.status(404).json({
            error: "Sorry, Record Not Found",
            status: false
          }));
        case 18:
          _context7.prev = 18;
          _context7.t0 = _context7["catch"](0);
          return _context7.abrupt("return", res.status(500).json({
            error: "Server error",
            status: false
          }));
        case 21:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 18]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());

//delete patients
router["delete"]("/patients/:id", authMiddleware, /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var idParam, deletedIds, query, _yield$pool$query17, _yield$pool$query18, results;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          idParam = req.params.id;
          deletedIds = idParam ? idParam.split(",") : [];
          if (!(!deletedIds || deletedIds.length === 0)) {
            _context9.next = 5;
            break;
          }
          return _context9.abrupt("return", res.status(400).json({
            error: "RowID must be required",
            status: false
          }));
        case 5:
          _context9.next = 7;
          return Promise.all(deletedIds.map(/*#__PURE__*/function () {
            var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(deletedId) {
              return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.next = 2;
                    return pool.query("SELECT * FROM ".concat(TABLE.PATIENTS_TABLE, " WHERE status = 1 and id = ?"), [deletedId]);
                  case 2:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }));
            return function (_x16) {
              return _ref9.apply(this, arguments);
            };
          }()));
        case 7:
          query = "UPDATE ".concat(TABLE.PATIENTS_TABLE, " SET status = 0, deleted_at = NOW() WHERE id IN (?)");
          _context9.next = 10;
          return pool.query(query, [deletedIds]);
        case 10:
          _yield$pool$query17 = _context9.sent;
          _yield$pool$query18 = _slicedToArray(_yield$pool$query17, 1);
          results = _yield$pool$query18[0];
          if (!(results.affectedRows > 0)) {
            _context9.next = 15;
            break;
          }
          return _context9.abrupt("return", res.status(200).json({
            message: "Record Successfully Deleted",
            status: true
          }));
        case 15:
          return _context9.abrupt("return", res.status(404).json({
            error: "Sorry, Record Not Found",
            status: false
          }));
        case 18:
          _context9.prev = 18;
          _context9.t0 = _context9["catch"](0);
          return _context9.abrupt("return", res.status(500).json({
            error: "Server error",
            status: false
          }));
        case 21:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 18]]);
  }));
  return function (_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}());

// // Update Doctor
// router.put("/doctor/:id", authMiddleware,async (req, res) => {
//   try {
//     const id = req.params.id;

//     if (!id) {
//       return res
//         .status(400)
//         .json({ error: "Doctor ID is required", status: false });
//     }

//     const [existingDoctor] = await pool.query(
//       `SELECT * FROM ${TABLE.DOCTORS_TABLE} WHERE id = ?  AND status = 1`,
//       [id]
//     );
//     if (!existingDoctor.length) {
//       return res.status(404).json({ error: "Doctor not found", status: false });
//     }

//     const {
//       first_name,
//       last_name,
//       email,
//       phone,
//       password,
//       dob,
//       age,
//       doctor_id,
//       speciality,
//       fees,
//     } = req.body;

//     // if (
//     //   !first_name ||
//     //   !last_name ||
//     //   !email ||
//     //   !phone ||
//     //   !password ||
//     //   !dob ||
//     //   !age ||
//     //   !doctor_id ||
//     //   !speciality
//     // ) 
//     // {
//     //   return res.status(400).json({
//     //     error:
//     //       "First Name, Last Name, Email, Phone, Password, DOB, Age, Doctor ID, and Speciality are required fields",
//     //     status: false,
//     //   });
//     // }

//     const mobileRegex = /^[0-9]{10}$/;
//     if (!mobileRegex.test(phone)) {
//       return res
//         .status(400)
//         .json({ error: "Phone number must be 10 digits", status: false });
//     }

//     if (!validateEmail(email)) {
//       return res
//         .status(400)
//         .json({ error: "Invalid email format", status: false });
//     }

//     if (!formatDateForDB(dob)) {
//       return res
//         .status(400)
//         .json({ error: "Invalid date format for DOB", status: false });
//     }

//     // Check if the email is already used by another doctor
//     const emailExists = await checkEmailExistOrNot(TABLE.DOCTORS_TABLE, email);
//     if (emailExists && email !== existingDoctor[0].email) {
//       return res
//         .status(409)
//         .json({ error: "Email already exists", status: false });
//     }

//     // Check if the doctor ID and speciality already exist
//     const [existingDoctorRecord] = await pool.query(
//       `SELECT * FROM ${TABLE.DOCTORS_TABLE} WHERE doctor_id = ? AND speciality = ?`,
//       [doctor_id, speciality]
//     );
//     if (
//       existingDoctorRecord.length &&
//       (doctor_id !== existingDoctor[0].doctor_id ||
//         speciality !== existingDoctor[0].speciality)
//     ) {
//       return res.status(409).json({
//         error: "Doctor ID and Speciality already exist",
//         status: false,
//       });
//     }

//     let hashedPassword = existingDoctor[0].password;
//     if (password) {
//       if (!validatePassword(password)) {
//         return res.status(400).json({
//           error:
//             "Password must be at least 9 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.",
//           status: false,
//         });
//       }
//       hashedPassword = await bcrypt.hash(password, 10);
//     }

//     await pool.query(
//       `UPDATE ${TABLE.DOCTORS_TABLE} 
//              SET first_name = ?, last_name = ?, email = ?, phone = ?, password = ?, dob = ?, age = ?, doctor_id = ?, speciality = ?, fees = ?, updated_at = NOW() 
//              WHERE id = ? AND status = 1`,
//       [
//         first_name,
//         last_name,
//         email,
//         phone,
//         hashedPassword,
//         dob,
//         age,
//         doctor_id,
//         speciality,
//         fees,
//         id,
//       ]
//     );

//     return res
//       .status(200)
//       .json({ message: "Doctor details successfully updated", status: true });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Server error", status: false });
//   }
// });

router.put("/doctor/:id", authMiddleware, /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var id, _yield$pool$query19, _yield$pool$query20, existingDoctor, allowedFields, updates, _i, _allowedFields, field, fields, values, updateQuery;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          id = req.params.id;
          if (id) {
            _context10.next = 4;
            break;
          }
          return _context10.abrupt("return", res.status(400).json({
            error: "Doctor ID is required",
            status: false
          }));
        case 4:
          _context10.next = 6;
          return pool.query("SELECT * FROM ".concat(TABLE.DOCTORS_TABLE, " WHERE id = ? AND status = 1"), [id]);
        case 6:
          _yield$pool$query19 = _context10.sent;
          _yield$pool$query20 = _slicedToArray(_yield$pool$query19, 1);
          existingDoctor = _yield$pool$query20[0];
          if (existingDoctor.length) {
            _context10.next = 11;
            break;
          }
          return _context10.abrupt("return", res.status(404).json({
            error: "Doctor not found",
            status: false
          }));
        case 11:
          // Extract provided fields from req.body
          allowedFields = ["first_name", "last_name", "email", "phone", "password", "dob", "age", "doctor_id", "speciality", "fees"];
          updates = {};
          for (_i = 0, _allowedFields = allowedFields; _i < _allowedFields.length; _i++) {
            field = _allowedFields[_i];
            if (req.body[field] !== undefined) {
              updates[field] = req.body[field];
            }
          }
          if (Object.keys(updates).length) {
            _context10.next = 16;
            break;
          }
          return _context10.abrupt("return", res.status(400).json({
            error: "No fields to update",
            status: false
          }));
        case 16:
          if (!(updates.phone && !/^[0-9]{10}$/.test(updates.phone))) {
            _context10.next = 18;
            break;
          }
          return _context10.abrupt("return", res.status(400).json({
            error: "Phone number must be 10 digits",
            status: false
          }));
        case 18:
          if (!(updates.email && !validateEmail(updates.email))) {
            _context10.next = 20;
            break;
          }
          return _context10.abrupt("return", res.status(400).json({
            error: "Invalid email format",
            status: false
          }));
        case 20:
          if (!(updates.dob && !formatDateForDB(updates.dob))) {
            _context10.next = 22;
            break;
          }
          return _context10.abrupt("return", res.status(400).json({
            error: "Invalid date format for DOB",
            status: false
          }));
        case 22:
          if (!updates.password) {
            _context10.next = 28;
            break;
          }
          if (validatePassword(updates.password)) {
            _context10.next = 25;
            break;
          }
          return _context10.abrupt("return", res.status(400).json({
            error: "Password must be at least 9 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.",
            status: false
          }));
        case 25:
          _context10.next = 27;
          return bcrypt.hash(updates.password, 10);
        case 27:
          updates.password = _context10.sent;
        case 28:
          // Prepare dynamic SQL query
          fields = Object.keys(updates).map(function (field) {
            return "".concat(field, " = ?");
          }).join(", ");
          values = Object.values(updates); // Append updated_at field
          updateQuery = "\n      UPDATE ".concat(TABLE.DOCTORS_TABLE, "\n      SET ").concat(fields, ", updated_at = NOW()\n      WHERE id = ? AND status = 1\n    ");
          values.push(id);

          // Execute the update query
          _context10.next = 34;
          return pool.query(updateQuery, values);
        case 34:
          return _context10.abrupt("return", res.status(200).json({
            message: "Doctor details successfully updated",
            status: true
          }));
        case 37:
          _context10.prev = 37;
          _context10.t0 = _context10["catch"](0);
          console.error(_context10.t0);
          return _context10.abrupt("return", res.status(500).json({
            error: "Server error",
            status: false
          }));
        case 41:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 37]]);
  }));
  return function (_x17, _x18) {
    return _ref10.apply(this, arguments);
  };
}());

// Update Patient
router.put("/patient/:id", authMiddleware, /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var id, _yield$pool$query21, _yield$pool$query22, existingPatient, _req$body4, first_name, last_name, email, phone, password, age, dob, address, mobileRegex, emailExists, hashedPassword;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          id = req.params.id;
          if (id) {
            _context11.next = 4;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            error: "Patient ID is required",
            status: false
          }));
        case 4:
          _context11.next = 6;
          return pool.query("SELECT * FROM ".concat(TABLE.PATIENTS_TABLE, " WHERE id = ? AND status = 1"), [id]);
        case 6:
          _yield$pool$query21 = _context11.sent;
          _yield$pool$query22 = _slicedToArray(_yield$pool$query21, 1);
          existingPatient = _yield$pool$query22[0];
          if (existingPatient.length) {
            _context11.next = 11;
            break;
          }
          return _context11.abrupt("return", res.status(404).json({
            error: "Patient not found",
            status: false
          }));
        case 11:
          _req$body4 = req.body, first_name = _req$body4.first_name, last_name = _req$body4.last_name, email = _req$body4.email, phone = _req$body4.phone, password = _req$body4.password, age = _req$body4.age, dob = _req$body4.dob, address = _req$body4.address;
          if (!(!first_name || !last_name || !email || !phone || !password || !age || !dob || !address)) {
            _context11.next = 14;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            error: "First Name, Last Name, Email, Phone, Password, Age, DOB, and Address are required fields",
            status: false
          }));
        case 14:
          mobileRegex = /^[0-9]{10}$/;
          if (mobileRegex.test(phone)) {
            _context11.next = 17;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            error: "Phone number must be 10 digits",
            status: false
          }));
        case 17:
          if (validateEmail(email)) {
            _context11.next = 19;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            error: "Invalid email format",
            status: false
          }));
        case 19:
          if (formatDateForDB(dob)) {
            _context11.next = 21;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            error: "Invalid date format for DOB",
            status: false
          }));
        case 21:
          _context11.next = 23;
          return checkEmailExistOrNot(TABLE.PATIENTS_TABLE, email);
        case 23:
          emailExists = _context11.sent;
          if (!(emailExists && email !== existingPatient[0].email)) {
            _context11.next = 26;
            break;
          }
          return _context11.abrupt("return", res.status(409).json({
            error: "Email already exists",
            status: false
          }));
        case 26:
          hashedPassword = existingPatient[0].password;
          if (!password) {
            _context11.next = 33;
            break;
          }
          if (validatePassword(password)) {
            _context11.next = 30;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            error: "Password must be at least 9 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.",
            status: false
          }));
        case 30:
          _context11.next = 32;
          return bcrypt.hash(password, 10);
        case 32:
          hashedPassword = _context11.sent;
        case 33:
          _context11.next = 35;
          return pool.query("UPDATE ".concat(TABLE.PATIENTS_TABLE, " SET first_name = ?, last_name = ?, email = ?, phone = ?, password = ?, age = ?, dob = ?, address = ?, updated_at = NOW() WHERE id = ?"), [first_name, last_name, email, phone, hashedPassword, age, dob, address, id]);
        case 35:
          return _context11.abrupt("return", res.status(200).json({
            message: "Patient details successfully updated",
            status: true
          }));
        case 38:
          _context11.prev = 38;
          _context11.t0 = _context11["catch"](0);
          console.error(_context11.t0);
          return _context11.abrupt("return", res.status(500).json({
            error: "Server error",
            status: false
          }));
        case 42:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 38]]);
  }));
  return function (_x19, _x20) {
    return _ref11.apply(this, arguments);
  };
}());

//forgot password patientc
router.post('/forgot-password', /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var email, _yield$pool$query23, _yield$pool$query24, existingPatient, otp, transporter, mailOptions;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          email = req.body.email;
          if (email) {
            _context12.next = 4;
            break;
          }
          return _context12.abrupt("return", res.status(400).json({
            error: 'Email is required',
            status: false
          }));
        case 4:
          _context12.next = 6;
          return pool.query("SELECT * FROM ".concat(TABLE.PATIENTS_TABLE, " WHERE email = ? AND status = 1"), [email]);
        case 6:
          _yield$pool$query23 = _context12.sent;
          _yield$pool$query24 = _slicedToArray(_yield$pool$query23, 1);
          existingPatient = _yield$pool$query24[0];
          if (existingPatient.length) {
            _context12.next = 11;
            break;
          }
          return _context12.abrupt("return", res.status(404).json({
            error: 'Email not found',
            status: false
          }));
        case 11:
          // Generate OTP using the imported generateOTP function
          otp = generateOTP(6); // 6-digit OTP
          // Save OTP in database (You might want to store this in a separate table or in the patients' table for verification)
          _context12.next = 14;
          return pool.query("UPDATE ".concat(TABLE.PATIENTS_TABLE, " SET otp = ?, otp_expiry = NOW() + INTERVAL 5 MINUTE WHERE email = ?"), [otp, email]);
        case 14:
          // Create a transporter using the SMTP details from .env
          transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
          }); // Send OTP email
          mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP for Password Reset',
            text: "Your OTP for password reset is ".concat(otp, ". This OTP will expire in 5 minutes.")
          };
          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              return res.status(500).json({
                error: 'Failed to send OTP email',
                status: false
              });
            } else {
              return res.status(200).json({
                message: 'OTP sent to your email',
                status: true
              });
            }
          });
          _context12.next = 23;
          break;
        case 19:
          _context12.prev = 19;
          _context12.t0 = _context12["catch"](0);
          console.error(_context12.t0);
          return _context12.abrupt("return", res.status(500).json({
            error: 'Server error',
            status: false
          }));
        case 23:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 19]]);
  }));
  return function (_x21, _x22) {
    return _ref12.apply(this, arguments);
  };
}());

//reset after otp patient
router.post('/reset-password', /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var _req$body5, email, otp, newPassword, _yield$pool$query25, _yield$pool$query26, patient, _yield$pool$query27, _yield$pool$query28, patientWithOtp, _patientWithOtp$, storedOtp, otp_expiry, currentTime, hashedPassword;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _req$body5 = req.body, email = _req$body5.email, otp = _req$body5.otp, newPassword = _req$body5.newPassword; // Validate input fields
          if (!(!email || !otp || !newPassword)) {
            _context13.next = 4;
            break;
          }
          return _context13.abrupt("return", res.status(400).json({
            error: 'Email, OTP, and new password are required',
            status: false
          }));
        case 4:
          if (validatePassword(newPassword)) {
            _context13.next = 6;
            break;
          }
          return _context13.abrupt("return", res.status(400).json({
            error: "Password must be at least 9 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.",
            status: false
          }));
        case 6:
          _context13.next = 8;
          return pool.query("SELECT * FROM ".concat(TABLE.PATIENTS_TABLE, " WHERE email = ? AND status = 1"), [email]);
        case 8:
          _yield$pool$query25 = _context13.sent;
          _yield$pool$query26 = _slicedToArray(_yield$pool$query25, 1);
          patient = _yield$pool$query26[0];
          if (patient.length) {
            _context13.next = 13;
            break;
          }
          return _context13.abrupt("return", res.status(404).json({
            error: 'Email not found',
            status: false
          }));
        case 13:
          _context13.next = 15;
          return pool.query("SELECT otp, otp_expiry FROM ".concat(TABLE.PATIENTS_TABLE, " WHERE email = ?"), [email]);
        case 15:
          _yield$pool$query27 = _context13.sent;
          _yield$pool$query28 = _slicedToArray(_yield$pool$query27, 1);
          patientWithOtp = _yield$pool$query28[0];
          _patientWithOtp$ = patientWithOtp[0], storedOtp = _patientWithOtp$.otp, otp_expiry = _patientWithOtp$.otp_expiry; // Check if OTP matches and has not expired
          if (!(storedOtp !== otp)) {
            _context13.next = 21;
            break;
          }
          return _context13.abrupt("return", res.status(400).json({
            error: 'Invalid OTP',
            status: false
          }));
        case 21:
          // Check OTP expiry (10 minutes window, adjust as per your requirement)
          currentTime = new Date();
          if (!(currentTime > otp_expiry)) {
            _context13.next = 24;
            break;
          }
          return _context13.abrupt("return", res.status(400).json({
            error: 'OTP has expired',
            status: false
          }));
        case 24:
          _context13.next = 26;
          return bcrypt.hash(newPassword, 10);
        case 26:
          hashedPassword = _context13.sent;
          _context13.next = 29;
          return pool.query("UPDATE ".concat(TABLE.PATIENTS_TABLE, " SET password = ?, otp = NULL WHERE email = ?"), [hashedPassword, email]);
        case 29:
          return _context13.abrupt("return", res.status(200).json({
            message: 'Password reset successfully',
            status: true
          }));
        case 32:
          _context13.prev = 32;
          _context13.t0 = _context13["catch"](0);
          console.error(_context13.t0);
          return _context13.abrupt("return", res.status(500).json({
            error: 'Server error',
            status: false
          }));
        case 36:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 32]]);
  }));
  return function (_x23, _x24) {
    return _ref13.apply(this, arguments);
  };
}());

// Forgot Password for Doctor
router.post('/doctor/forgot-password', /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var email, _yield$pool$query29, _yield$pool$query30, existingDoctor, otp, transporter, mailOptions;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          email = req.body.email;
          if (email) {
            _context14.next = 4;
            break;
          }
          return _context14.abrupt("return", res.status(400).json({
            error: 'Email is required',
            status: false
          }));
        case 4:
          _context14.next = 6;
          return pool.query("SELECT * FROM ".concat(TABLE.DOCTORS_TABLE, " WHERE email = ? AND status = 1"), [email]);
        case 6:
          _yield$pool$query29 = _context14.sent;
          _yield$pool$query30 = _slicedToArray(_yield$pool$query29, 1);
          existingDoctor = _yield$pool$query30[0];
          if (existingDoctor.length) {
            _context14.next = 11;
            break;
          }
          return _context14.abrupt("return", res.status(404).json({
            error: 'Email not found',
            status: false
          }));
        case 11:
          // Generate OTP
          otp = generateOTP(6); // Save OTP in the database
          _context14.next = 14;
          return pool.query("UPDATE ".concat(TABLE.DOCTORS_TABLE, " SET otp = ?, otp_expiry = NOW() + INTERVAL 5 MINUTE WHERE email = ?"), [otp, email]);
        case 14:
          // Send OTP email
          transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
          });
          mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP for Password Reset',
            text: "Your OTP for password reset is ".concat(otp, ". This OTP will expire in 5 minutes.")
          };
          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              return res.status(500).json({
                error: 'Failed to send OTP email',
                status: false
              });
            } else {
              return res.status(200).json({
                message: 'OTP sent to your email',
                status: true
              });
            }
          });
          _context14.next = 23;
          break;
        case 19:
          _context14.prev = 19;
          _context14.t0 = _context14["catch"](0);
          console.error(_context14.t0);
          return _context14.abrupt("return", res.status(500).json({
            error: 'Server error',
            status: false
          }));
        case 23:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 19]]);
  }));
  return function (_x25, _x26) {
    return _ref14.apply(this, arguments);
  };
}());

// Reset Password for Doctor
router.post('/doctor/reset-password', /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var _req$body6, email, otp, newPassword, _yield$pool$query31, _yield$pool$query32, doctor, _yield$pool$query33, _yield$pool$query34, doctorWithOtp, _doctorWithOtp$, storedOtp, otp_expiry, currentTime, hashedPassword;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _req$body6 = req.body, email = _req$body6.email, otp = _req$body6.otp, newPassword = _req$body6.newPassword;
          if (!(!email || !otp || !newPassword)) {
            _context15.next = 4;
            break;
          }
          return _context15.abrupt("return", res.status(400).json({
            error: 'Email, OTP, and new password are required',
            status: false
          }));
        case 4:
          if (validatePassword(newPassword)) {
            _context15.next = 6;
            break;
          }
          return _context15.abrupt("return", res.status(400).json({
            error: 'Password must be at least 9 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.',
            status: false
          }));
        case 6:
          _context15.next = 8;
          return pool.query("SELECT * FROM ".concat(TABLE.DOCTORS_TABLE, " WHERE email = ? AND status = 1"), [email]);
        case 8:
          _yield$pool$query31 = _context15.sent;
          _yield$pool$query32 = _slicedToArray(_yield$pool$query31, 1);
          doctor = _yield$pool$query32[0];
          if (doctor.length) {
            _context15.next = 13;
            break;
          }
          return _context15.abrupt("return", res.status(404).json({
            error: 'Email not found',
            status: false
          }));
        case 13:
          _context15.next = 15;
          return pool.query("SELECT otp, otp_expiry FROM ".concat(TABLE.DOCTORS_TABLE, " WHERE email = ?"), [email]);
        case 15:
          _yield$pool$query33 = _context15.sent;
          _yield$pool$query34 = _slicedToArray(_yield$pool$query33, 1);
          doctorWithOtp = _yield$pool$query34[0];
          _doctorWithOtp$ = doctorWithOtp[0], storedOtp = _doctorWithOtp$.otp, otp_expiry = _doctorWithOtp$.otp_expiry;
          if (!(storedOtp !== otp)) {
            _context15.next = 21;
            break;
          }
          return _context15.abrupt("return", res.status(400).json({
            error: 'Invalid OTP',
            status: false
          }));
        case 21:
          currentTime = new Date();
          if (!(currentTime > otp_expiry)) {
            _context15.next = 24;
            break;
          }
          return _context15.abrupt("return", res.status(400).json({
            error: 'OTP has expired',
            status: false
          }));
        case 24:
          _context15.next = 26;
          return bcrypt.hash(newPassword, 10);
        case 26:
          hashedPassword = _context15.sent;
          _context15.next = 29;
          return pool.query("UPDATE ".concat(TABLE.DOCTORS_TABLE, " SET password = ?, otp = NULL WHERE email = ?"), [hashedPassword, email]);
        case 29:
          return _context15.abrupt("return", res.status(200).json({
            message: 'Password reset successfully',
            status: true
          }));
        case 32:
          _context15.prev = 32;
          _context15.t0 = _context15["catch"](0);
          console.error(_context15.t0);
          return _context15.abrupt("return", res.status(500).json({
            error: 'Server error',
            status: false
          }));
        case 36:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 32]]);
  }));
  return function (_x27, _x28) {
    return _ref15.apply(this, arguments);
  };
}());
router.post("/change-password", /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var _req$body7, role, email, oldPassword, newPassword, confirmPassword, table, _yield$pool$query35, _yield$pool$query36, user, isOldPasswordValid, hashedNewPassword;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _req$body7 = req.body, role = _req$body7.role, email = _req$body7.email, oldPassword = _req$body7.oldPassword, newPassword = _req$body7.newPassword, confirmPassword = _req$body7.confirmPassword;
          if (!(!role || !email || !oldPassword || !newPassword || !confirmPassword)) {
            _context16.next = 4;
            break;
          }
          return _context16.abrupt("return", res.status(400).json({
            error: "Role, Email, Old Password, New Password, and Confirm Password are required fields.",
            status: false
          }));
        case 4:
          if (!(newPassword !== confirmPassword)) {
            _context16.next = 6;
            break;
          }
          return _context16.abrupt("return", res.status(400).json({
            error: "New password and confirm password do not match.",
            status: false
          }));
        case 6:
          if (validatePassword(newPassword)) {
            _context16.next = 8;
            break;
          }
          return _context16.abrupt("return", res.status(400).json({
            error: "Password must be at least 9 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.",
            status: false
          }));
        case 8:
          table = "";
          if (!(role === "patient")) {
            _context16.next = 13;
            break;
          }
          table = TABLE.PATIENTS_TABLE;
          _context16.next = 18;
          break;
        case 13:
          if (!(role === "doctor")) {
            _context16.next = 17;
            break;
          }
          table = TABLE.DOCTORS_TABLE;
          _context16.next = 18;
          break;
        case 17:
          return _context16.abrupt("return", res.status(400).json({
            error: 'Role must be either "patient" or "doctor".',
            status: false
          }));
        case 18:
          _context16.next = 20;
          return pool.query("SELECT * FROM ".concat(table, " WHERE email = ? AND status = 1"), [email]);
        case 20:
          _yield$pool$query35 = _context16.sent;
          _yield$pool$query36 = _slicedToArray(_yield$pool$query35, 1);
          user = _yield$pool$query36[0];
          if (user.length) {
            _context16.next = 25;
            break;
          }
          return _context16.abrupt("return", res.status(404).json({
            error: "User not found or inactive.",
            status: false
          }));
        case 25:
          _context16.next = 27;
          return bcrypt.compare(oldPassword, user[0].password);
        case 27:
          isOldPasswordValid = _context16.sent;
          if (isOldPasswordValid) {
            _context16.next = 30;
            break;
          }
          return _context16.abrupt("return", res.status(400).json({
            error: "Old password is incorrect.",
            status: false
          }));
        case 30:
          _context16.next = 32;
          return bcrypt.hash(newPassword, 10);
        case 32:
          hashedNewPassword = _context16.sent;
          _context16.next = 35;
          return pool.query("UPDATE ".concat(table, " SET password = ? WHERE email = ?"), [hashedNewPassword, email]);
        case 35:
          return _context16.abrupt("return", res.status(200).json({
            message: "Password updated successfully.",
            status: true
          }));
        case 38:
          _context16.prev = 38;
          _context16.t0 = _context16["catch"](0);
          console.error(_context16.t0);
          return _context16.abrupt("return", res.status(500).json({
            error: "Server error",
            status: false
          }));
        case 42:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 38]]);
  }));
  return function (_x29, _x30) {
    return _ref16.apply(this, arguments);
  };
}());

// Verify Token (Admin)
router.get('/admin-verifytoken', /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
    var authHeader, token;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          authHeader = req.headers['authorization'];
          token = authHeader && authHeader.split(' ')[1];
          if (token) {
            _context18.next = 5;
            break;
          }
          return _context18.abrupt("return", res.status(400).json({
            error: 'Token is required',
            status: false
          }));
        case 5:
          jwt.verify(token, API_SECRET_KEY, /*#__PURE__*/function () {
            var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(err, decoded) {
              var _yield$pool$query37, _yield$pool$query38, result, user;
              return _regeneratorRuntime().wrap(function _callee17$(_context17) {
                while (1) switch (_context17.prev = _context17.next) {
                  case 0:
                    if (!err) {
                      _context17.next = 2;
                      break;
                    }
                    return _context17.abrupt("return", res.status(401).json({
                      error: 'Invalid or expired token',
                      status: false
                    }));
                  case 2:
                    _context17.next = 4;
                    return pool.query("SELECT * FROM ".concat(TABLE.DOCTORS_TABLE, " WHERE id = ?"), [decoded.data.id]);
                  case 4:
                    _yield$pool$query37 = _context17.sent;
                    _yield$pool$query38 = _slicedToArray(_yield$pool$query37, 1);
                    result = _yield$pool$query38[0];
                    if (!(result.length === 0)) {
                      _context17.next = 9;
                      break;
                    }
                    return _context17.abrupt("return", res.status(404).json({
                      error: 'User not found',
                      status: false
                    }));
                  case 9:
                    user = result[0];
                    return _context17.abrupt("return", res.status(200).json({
                      data: _objectSpread(_objectSpread({}, user), {}, {
                        accessToken: token,
                        password: ""
                      }),
                      message: 'Token is valid',
                      status: true
                    }));
                  case 11:
                  case "end":
                    return _context17.stop();
                }
              }, _callee17);
            }));
            return function (_x33, _x34) {
              return _ref18.apply(this, arguments);
            };
          }());
          _context18.next = 11;
          break;
        case 8:
          _context18.prev = 8;
          _context18.t0 = _context18["catch"](0);
          return _context18.abrupt("return", res.status(500).json({
            error: "Error occurred: ".concat(_context18.t0.message),
            status: false
          }));
        case 11:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[0, 8]]);
  }));
  return function (_x31, _x32) {
    return _ref17.apply(this, arguments);
  };
}());

// Get bookings for a specific doctor by doctor_id
router.get('/:doctor_id', /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
    var doctorId, _yield$pool$query39, _yield$pool$query40, results;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          doctorId = req.params.doctor_id;
          if (doctorId) {
            _context19.next = 4;
            break;
          }
          return _context19.abrupt("return", res.status(400).json({
            error: 'Doctor ID is required',
            status: false
          }));
        case 4:
          _context19.next = 6;
          return pool.query("\n          SELECT * \n          FROM ".concat(TABLE.BOOKING_TABLE, " \n          WHERE status = 1 AND doctor = ?\n      "), [doctorId]);
        case 6:
          _yield$pool$query39 = _context19.sent;
          _yield$pool$query40 = _slicedToArray(_yield$pool$query39, 1);
          results = _yield$pool$query40[0];
          if (!(results.length > 0)) {
            _context19.next = 13;
            break;
          }
          return _context19.abrupt("return", res.status(200).json({
            data: results,
            message: 'Bookings for the doctor fetched successfully',
            status: true,
            count: results.length
          }));
        case 13:
          return _context19.abrupt("return", res.status(404).json({
            error: 'No bookings found for this doctor',
            status: false
          }));
        case 14:
          _context19.next = 20;
          break;
        case 16:
          _context19.prev = 16;
          _context19.t0 = _context19["catch"](0);
          console.error(_context19.t0);
          return _context19.abrupt("return", res.status(500).json({
            error: 'Server error',
            status: false
          }));
        case 20:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[0, 16]]);
  }));
  return function (_x35, _x36) {
    return _ref19.apply(this, arguments);
  };
}());
module.exports = router;
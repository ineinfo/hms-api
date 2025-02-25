"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var pool = require('../utils/db');
var TABLE = require('../utils/tables');
var multer = require('multer');
function multerErrorHandler(err, req, res, next) {
  if (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          error: 'File size must be less than 5KB',
          status: false
        });
      }
    }
    return res.status(400).json({
      error: err.message,
      status: false
    });
  }
  next();
}

// Generate OTP
function generateOTP(digits) {
  var min = Math.pow(10, digits - 1);
  var max = Math.pow(10, digits) - 1;
  return Math.floor(min + Math.random() * (max - min + 1)).toString();
}
function validateEmail(email) {
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
  return emailRegex.test(email);
}
function validatePhone(phone) {
  var mobileRegex = /^[0-9]{10}$/;
  return mobileRegex.test(phone);
}

// Check email exists or not
var checkEmailExistOrNot = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(tableName, email) {
    var ID,
      sql,
      values,
      _yield$pool$query,
      _yield$pool$query2,
      rows,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          ID = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;
          _context.prev = 1;
          sql = 'SELECT * FROM ' + tableName + ' WHERE email = ? and status = 1';
          values = [email];
          if (ID !== null) {
            sql += ' AND id != ?';
            values.push(ID);
          }
          _context.next = 7;
          return pool.query(sql, values);
        case 7:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = _slicedToArray(_yield$pool$query, 1);
          rows = _yield$pool$query2[0];
          return _context.abrupt("return", rows.length > 0);
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](1);
          console.error('Error occurred while checking email:', _context.t0);
          throw new Error('Failed to check email existence');
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 13]]);
  }));
  return function checkEmailExistOrNot(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Check mobile exists or not
var checkPhoneExistOrNot = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(tableName, phone) {
    var ID,
      sql,
      values,
      _yield$pool$query3,
      _yield$pool$query4,
      rows,
      _args2 = arguments;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          ID = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : null;
          _context2.prev = 1;
          sql = 'SELECT * FROM ' + tableName + ' WHERE phone = ? and status = 1';
          values = [phone];
          if (ID !== null) {
            sql += ' AND id != ?';
            values.push(ID);
          }
          _context2.next = 7;
          return pool.query(sql, values);
        case 7:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = _slicedToArray(_yield$pool$query3, 1);
          rows = _yield$pool$query4[0];
          return _context2.abrupt("return", rows.length > 0);
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](1);
          console.error('Error occurred while checking phone:', _context2.t0);
          throw new Error('Failed to check phone existence');
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 13]]);
  }));
  return function checkPhoneExistOrNot(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Manage API Response Status
function ManageResponseStatus(action) {
  var defaultTitles = {
    created: 'Record Successfully Created',
    updated: 'Record Successfully Updated',
    deleted: 'Record Successfully Deleted',
    fetched: 'Record Successfully Fetched',
    alreadyDeleted: 'Record Already Deleted',
    notFound: 'Sorry, Record Not Found',
    error: 'Something Went Wrong!',
    exist: 'Record Already Exist!',
    RowIdRequired: 'RowID must be required'
  };
  return defaultTitles[action];
}

// Password validation - Password must be at least 9 characters long and contain at least one uppercase letter, one lowercase letter and one special character.
function validatePassword(password) {
  // Minimum length check
  if (password.length < 9) {
    return false;
  }

  // Uppercase, lowercase, and special characters check
  var uppercaseRegex = /[A-Z]/;
  var lowercaseRegex = /[a-z]/;
  var specialCharactersRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  var hasUppercase = uppercaseRegex.test(password);
  var hasLowercase = lowercaseRegex.test(password);
  var hasSpecialCharacters = specialCharactersRegex.test(password);

  // Check if all conditions are met
  return hasUppercase && hasLowercase && hasSpecialCharacters;
}
function formatDateForDB(dateStr) {
  var _dateStr$split = dateStr.split('-'),
    _dateStr$split2 = _slicedToArray(_dateStr$split, 3),
    day = _dateStr$split2[0],
    month = _dateStr$split2[1],
    year = _dateStr$split2[2];
  var fullYear = year.length === 2 ? "20".concat(year) : year;
  return "".concat(fullYear, "-").concat(month, "-").concat(day);
}
var validateDate = function validateDate(date) {
  var dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return {
      error: 'Invalid date format. Please use yyyy-mm-dd.'
    };
  }
  return null;
};

// Function to validate the time format (hh:mm AM/PM)
var validateTime = function validateTime(time) {
  var timeRegex = /^(0[1-9]|1[0-2]):([0-5][0-9])\s([APap][Mm])$/;
  if (!timeRegex.test(time)) {
    return {
      error: 'Invalid time format. Please use hh:mm AM/PM.'
    };
  }
  return null;
};

// Function to convert time from AM/PM to 24-hour format
var convertTo24HrFormat = function convertTo24HrFormat(time) {
  var timeIn24HrFormat = time;
  if (time.includes('AM') || time.includes('PM')) {
    var _time$split = time.split(' '),
      _time$split2 = _slicedToArray(_time$split, 2),
      timeStr = _time$split2[0],
      period = _time$split2[1];
    var _timeStr$split = timeStr.split(':'),
      _timeStr$split2 = _slicedToArray(_timeStr$split, 2),
      hour = _timeStr$split2[0],
      minute = _timeStr$split2[1];
    hour = parseInt(hour);

    // Convert to 24-hour format
    if (period.toUpperCase() === 'PM' && hour < 12) {
      hour += 12; // Convert PM to 24-hour time
    }
    if (period.toUpperCase() === 'AM' && hour === 12) {
      hour = 0; // Convert 12 AM to 00:00
    }

    // Format time as hh:mm
    timeIn24HrFormat = "".concat(hour < 10 ? '0' + hour : hour, ":").concat(minute);
  }
  return timeIn24HrFormat;
};
module.exports = {
  generateOTP: generateOTP,
  validateEmail: validateEmail,
  ManageResponseStatus: ManageResponseStatus,
  checkEmailExistOrNot: checkEmailExistOrNot,
  checkPhoneExistOrNot: checkPhoneExistOrNot,
  validatePassword: validatePassword,
  multerErrorHandler: multerErrorHandler,
  formatDateForDB: formatDateForDB,
  validateDate: validateDate,
  validateTime: validateTime,
  convertTo24HrFormat: convertTo24HrFormat,
  validatePhone: validatePhone
};
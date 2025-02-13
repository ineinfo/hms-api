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
var express = require('express');
var pool = require('../utils/db');
var router = express.Router();
var TABLE = require("../utils/tables");
var authMiddleware = require("../utils/authMiddleware");
var jwt = require('jsonwebtoken');
var _require = require('../utils/common'),
  validateDate = _require.validateDate,
  validateTime = _require.validateTime,
  validateEmail = _require.validateEmail,
  validatePhone = _require.validatePhone,
  convertTo24HrFormat = _require.convertTo24HrFormat;
router.post('/', authMiddleware, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, patient_id, medicine, test, notes, process, booking_id, _yield$pool$query, _yield$pool$query2, appointmentResults, _yield$pool$query3, _yield$pool$query4, medicineResults, existingMedicineIds, missingMedicines, _yield$pool$query5, _yield$pool$query6, testResults, existingTestIds, missingTests, _yield$pool$query7, _yield$pool$query8, prescriptionResults;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, patient_id = _req$body.patient_id, medicine = _req$body.medicine, test = _req$body.test, notes = _req$body.notes, process = _req$body.process, booking_id = _req$body.booking_id; // Validate that all necessary fields are provided
          if (!(!patient_id || !medicine || !test || !notes || !process || !booking_id)) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: 'All fields are required',
            status: false
          }));
        case 4:
          if (!(!Array.isArray(medicine) || !Array.isArray(test))) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: 'Medicine and test must be arrays',
            status: false
          }));
        case 6:
          if (!(medicine.length === 0 || test.length === 0)) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: 'Medicine and test arrays cannot be empty',
            status: false
          }));
        case 8:
          _context.next = 10;
          return pool.query("\n                SELECT * FROM ".concat(TABLE.BOOKING_TABLE, "\n                WHERE id = ? AND patient_id = ? AND doctor = ?"), [booking_id, patient_id, req.doctor_id]);
        case 10:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = _slicedToArray(_yield$pool$query, 1);
          appointmentResults = _yield$pool$query2[0];
          if (!(appointmentResults.length === 0)) {
            _context.next = 15;
            break;
          }
          return _context.abrupt("return", res.status(403).json({
            error: 'You are not authorized to prescribe for this patient',
            status: false
          }));
        case 15:
          _context.next = 17;
          return pool.query("\n                SELECT id, title FROM ".concat(TABLE.MEDICINES_TABLE, "\n                WHERE title IN (?)"), [medicine]);
        case 17:
          _yield$pool$query3 = _context.sent;
          _yield$pool$query4 = _slicedToArray(_yield$pool$query3, 1);
          medicineResults = _yield$pool$query4[0];
          existingMedicineIds = medicineResults.map(function (med) {
            return med.id;
          });
          missingMedicines = medicine.filter(function (title) {
            return !medicineResults.map(function (med) {
              return med.title;
            }).includes(title);
          });
          if (!(missingMedicines.length > 0)) {
            _context.next = 24;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "The following medicines are not found: ".concat(missingMedicines.join(', ')),
            status: false
          }));
        case 24:
          _context.next = 26;
          return pool.query("\n                SELECT id, title FROM ".concat(TABLE.BODYTEST_TABLE, "\n                WHERE title IN (?)"), [test]);
        case 26:
          _yield$pool$query5 = _context.sent;
          _yield$pool$query6 = _slicedToArray(_yield$pool$query5, 1);
          testResults = _yield$pool$query6[0];
          existingTestIds = testResults.map(function (tst) {
            return tst.id;
          });
          missingTests = test.filter(function (title) {
            return !testResults.map(function (tst) {
              return tst.title;
            }).includes(title);
          });
          if (!(missingTests.length > 0)) {
            _context.next = 33;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "The following tests are not found: ".concat(missingTests.join(', ')),
            status: false
          }));
        case 33:
          _context.next = 35;
          return pool.query("\n                INSERT INTO ".concat(TABLE.PRESCRIPTION_TABLE, " \n                (patient_id, medicine, test, notes, process, booking_id) \n                VALUES (?, ?, ?, ?, ?, ?)"), [patient_id, existingMedicineIds.join(','), existingTestIds.join(','), notes, process, booking_id]);
        case 35:
          _yield$pool$query7 = _context.sent;
          _yield$pool$query8 = _slicedToArray(_yield$pool$query7, 1);
          prescriptionResults = _yield$pool$query8[0];
          _context.next = 40;
          return pool.query("\n                UPDATE ".concat(TABLE.BOOKING_TABLE, "\n                SET process = ?\n                WHERE id = ? AND patient_id = ?"), [process, booking_id, patient_id]);
        case 40:
          return _context.abrupt("return", res.status(201).json({
            message: 'Prescription created successfully',
            prescription_id: prescriptionResults.insertId,
            patient_id: patient_id,
            medicines: existingMedicineIds,
            tests: existingTestIds,
            notes: notes,
            process: process,
            booking_id: booking_id,
            status: true
          }));
        case 43:
          _context.prev = 43;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            error: 'Server error',
            status: false
          }));
        case 47:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 43]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.put('/:id', authMiddleware, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var id, _yield$pool$query9, _yield$pool$query10, existingRecord, _req$body2, medicine, test, notes, process, medicineTitles, _yield$pool$query11, _yield$pool$query12, medicineResults, existingMedicineIds, existingMedicineTitles, missingMedicines, testNames, _yield$pool$query13, _yield$pool$query14, testResults, existingTestIds, existingTestNames, missingTests, updateQuery, queryParams;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          if (id) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            error: 'RowID must be required',
            status: false
          }));
        case 4:
          _context2.next = 6;
          return pool.query("SELECT * FROM ".concat(TABLE.PRESCRIPTION_TABLE, " WHERE status = 1 AND id = ?"), [id]);
        case 6:
          _yield$pool$query9 = _context2.sent;
          _yield$pool$query10 = _slicedToArray(_yield$pool$query9, 1);
          existingRecord = _yield$pool$query10[0];
          if (existingRecord.length) {
            _context2.next = 11;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            error: "Sorry, Record Not Found",
            status: false
          }));
        case 11:
          _req$body2 = req.body, medicine = _req$body2.medicine, test = _req$body2.test, notes = _req$body2.notes, process = _req$body2.process;
          if (!(!medicine || !test || !notes || !process)) {
            _context2.next = 14;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            error: 'Medicine, Test, Notes, and Process fields are required',
            status: false
          }));
        case 14:
          // Process medicine input
          medicineTitles = medicine.split(',').map(function (title) {
            return title.trim();
          });
          _context2.next = 17;
          return pool.query("SELECT id, title FROM ".concat(TABLE.MEDICINES_TABLE, " WHERE title IN (?)"), [medicineTitles]);
        case 17:
          _yield$pool$query11 = _context2.sent;
          _yield$pool$query12 = _slicedToArray(_yield$pool$query11, 1);
          medicineResults = _yield$pool$query12[0];
          existingMedicineIds = medicineResults.map(function (med) {
            return med.id;
          });
          existingMedicineTitles = medicineResults.map(function (med) {
            return med.title;
          });
          missingMedicines = medicineTitles.filter(function (title) {
            return !existingMedicineTitles.includes(title);
          });
          if (!(missingMedicines.length > 0)) {
            _context2.next = 25;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            error: "The following medicines are not found: ".concat(missingMedicines.join(', ')),
            status: false
          }));
        case 25:
          // Process test input
          testNames = test.split(',').map(function (title) {
            return title.trim();
          });
          _context2.next = 28;
          return pool.query("SELECT id, title FROM ".concat(TABLE.BODYTEST_TABLE, " WHERE title IN (?)"), [testNames]);
        case 28:
          _yield$pool$query13 = _context2.sent;
          _yield$pool$query14 = _slicedToArray(_yield$pool$query13, 1);
          testResults = _yield$pool$query14[0];
          existingTestIds = testResults.map(function (tst) {
            return tst.id;
          });
          existingTestNames = testResults.map(function (tst) {
            return tst.title;
          });
          missingTests = testNames.filter(function (title) {
            return !existingTestNames.includes(title);
          });
          if (!(missingTests.length > 0)) {
            _context2.next = 36;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            error: "The following tests are not found: ".concat(missingTests.join(', ')),
            status: false
          }));
        case 36:
          // Update the prescription record
          updateQuery = "\n            UPDATE ".concat(TABLE.PRESCRIPTION_TABLE, "\n            SET medicine = ?, test = ?, notes = ?, process = ?, updated_at = NOW()\n            WHERE id = ?\n        ");
          queryParams = [existingMedicineIds.join(','),
          // Store medicine IDs
          existingTestIds.join(','),
          // Store test IDs
          notes, process, id];
          _context2.next = 40;
          return pool.query(updateQuery, queryParams);
        case 40:
          return _context2.abrupt("return", res.status(200).json({
            message: "Record Successfully Updated",
            status: true
          }));
        case 43:
          _context2.prev = 43;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            error: 'Server error',
            status: false
          }));
        case 47:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 43]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router["delete"]('/:id', authMiddleware, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var idParam, deletedIds, query, _yield$pool$query15, _yield$pool$query16, results;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          idParam = req.params.id;
          deletedIds = idParam ? idParam.split(',') : [];
          if (!(!deletedIds || deletedIds.length === 0)) {
            _context4.next = 5;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: 'RowID must be required',
            status: false
          }));
        case 5:
          _context4.next = 7;
          return Promise.all(deletedIds.map(/*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(deletedId) {
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return pool.query("SELECT * FROM ".concat(TABLE.PRESCRIPTION_TABLE, " WHERE status = 1 and id = ?"), [deletedId]);
                  case 2:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function (_x7) {
              return _ref4.apply(this, arguments);
            };
          }()));
        case 7:
          query = "UPDATE ".concat(TABLE.PRESCRIPTION_TABLE, " SET status = 0, deleted_at = NOW() WHERE id IN (?)");
          _context4.next = 10;
          return pool.query(query, [deletedIds]);
        case 10:
          _yield$pool$query15 = _context4.sent;
          _yield$pool$query16 = _slicedToArray(_yield$pool$query15, 1);
          results = _yield$pool$query16[0];
          if (!(results.affectedRows > 0)) {
            _context4.next = 15;
            break;
          }
          return _context4.abrupt("return", res.status(200).json({
            message: "Record Successfully Deleted",
            status: true
          }));
        case 15:
          return _context4.abrupt("return", res.status(404).json({
            error: "Sorry, Record Not Found",
            status: false
          }));
        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", res.status(500).json({
            error: 'Server error',
            status: false
          }));
        case 21:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 18]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

//get all specific 
router.get('/:id?', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var id, _yield$pool$query17, _yield$pool$query18, _results, _yield$pool$query19, _yield$pool$query20, results;
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
          return pool.query("SELECT * FROM ".concat(TABLE.PRESCRIPTION_TABLE, " WHERE status = 1 and id = ?"), [id]);
        case 5:
          _yield$pool$query17 = _context5.sent;
          _yield$pool$query18 = _slicedToArray(_yield$pool$query17, 1);
          _results = _yield$pool$query18[0];
          if (!(_results.length > 0)) {
            _context5.next = 10;
            break;
          }
          return _context5.abrupt("return", res.status(200).json({
            data: _results[0],
            message: "Record Successfully Fetched",
            status: true
          }));
        case 10:
          return _context5.abrupt("return", res.status(404).json({
            error: "Sorry, Record Not Found",
            status: false
          }));
        case 11:
          _context5.next = 13;
          return pool.query("SELECT * FROM ".concat(TABLE.PRESCRIPTION_TABLE, " WHERE status = 1 ORDER BY ID DESC"));
        case 13:
          _yield$pool$query19 = _context5.sent;
          _yield$pool$query20 = _slicedToArray(_yield$pool$query19, 1);
          results = _yield$pool$query20[0];
          return _context5.abrupt("return", res.status(200).json({
            data: results,
            message: "Record Successfully Fetched",
            status: true,
            count: results.length
          }));
        case 19:
          _context5.prev = 19;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", res.status(500).json({
            error: 'Server error',
            status: false
          }));
        case 22:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 19]]);
  }));
  return function (_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}());

// //all medical history of patient
router.get('/patientid/:patient_id', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var patientId, _yield$pool$query21, _yield$pool$query22, prescriptions;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          patientId = req.params.patient_id;
          console.log("Patient ID from request params:", patientId);
          if (patientId) {
            _context6.next = 5;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            error: 'Patient ID is required',
            status: false
          }));
        case 5:
          _context6.next = 7;
          return pool.query("\n            SELECT p.id AS prescription_id, p.booking_id, p.patient_id, p.medicine, p.test, p.process, \n                   p.notes, \n                   b.*,  \n                   d.*  \n            FROM ".concat(TABLE.PRESCRIPTION_TABLE, " p\n            LEFT JOIN ").concat(TABLE.BOOKING_TABLE, " b ON p.booking_id = b.id\n            LEFT JOIN ").concat(TABLE.DOCTORS_TABLE, " d ON b.doctor = d.doctor_id  \n            WHERE p.patient_id = ? AND p.status = 1\n        "), [patientId]);
        case 7:
          _yield$pool$query21 = _context6.sent;
          _yield$pool$query22 = _slicedToArray(_yield$pool$query21, 1);
          prescriptions = _yield$pool$query22[0];
          console.log("Prescriptions with full Booking and Doctor Info:", prescriptions);
          if (!(prescriptions.length === 0)) {
            _context6.next = 13;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            error: 'No prescriptions found for this patient',
            status: false
          }));
        case 13:
          return _context6.abrupt("return", res.status(200).json({
            data: prescriptions,
            message: 'Prescriptions with booking and doctor details successfully fetched',
            status: true,
            count: prescriptions.length
          }));
        case 16:
          _context6.prev = 16;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);
          return _context6.abrupt("return", res.status(500).json({
            error: 'Server error',
            status: false
          }));
        case 20:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 16]]);
  }));
  return function (_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}());

// // Get bookings for a specific doctor by doctor_id
// router.get('/doctor/:doctor_id', async (req, res) => {
//     try {
//         const doctorId = req.params.doctor_id;

//         if (!doctorId) {
//             return res.status(400).json({ error: 'Doctor ID is required', status: false });
//         }

//         const [results] = await pool.query(`
//             SELECT * 
//             FROM ${TABLE.BOOKING_TABLE} 
//             WHERE status = 1 AND doctor = ?
//         `, [doctorId]);

//         // Check if any bookings are found
//         if (results.length > 0) {
//             return res.status(200).json({
//                 data: results,
//                 message: 'Bookings for the doctor fetched successfully',
//                 status: true,
//                 count: results.length
//             });
//         } else {
//             return res.status(404).json({
//                 error: 'No bookings found for this doctor',
//                 status: false
//             });
//         }

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Server error', status: false });
//     }
// });

module.exports = router;
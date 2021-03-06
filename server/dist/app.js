'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _routes = require('./routes/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create a top level instance of express
var app = (0, _express2.default)();

app.use((0, _morgan2.default)('dev'));

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

var port = process.env.PORT || 6000;

app.use('/api/v1/', _routes2.default);

app.all('*', function (req, res) {
  return res.status(404).json({
    message: 'Wrong endpoint. Such endpoint does not exist'
  });
});

app.listen(port, function () {
  _winston2.default.info('Server is live on PORT\uD83D\uDC4D : ' + port);
});

exports.default = app;
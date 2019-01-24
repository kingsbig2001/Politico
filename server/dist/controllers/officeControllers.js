'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _officeModels = require('../models/officeModels');

var _officeModels2 = _interopRequireDefault(_officeModels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing OfficeController
 * @class OfficeController
 */
var OfficesController = function () {
  function OfficesController() {
    _classCallCheck(this, OfficesController);
  }

  _createClass(OfficesController, null, [{
    key: 'createOffice',

    /**
           * @description Create a new political party
           * @param {object} req - The request object
           * @param {object} res - The response object
           * @return {object} JSON representing data object
           * @memberof createOffice
           */
    value: function createOffice(req, res) {
      var _req$body = req.body,
          type = _req$body.type,
          name = _req$body.name;

      var id = _officeModels2.default[_officeModels2.default.length - 1].id + 1;
      var registerdAt = new Date();
      var updatedAlt = new Date();
      var newOffice = {
        id: id, type: type, name: name, registerdAt: registerdAt, updatedAlt: updatedAlt
      };
      if (newOffice) {
        _officeModels2.default.push(newOffice);
        return res.status(201).json({
          status: 201,
          data: [newOffice]
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'Bad request'
      });
    }
  }]);

  return OfficesController;
}();

exports.default = OfficesController;
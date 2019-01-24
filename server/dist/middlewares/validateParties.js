'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helperUltis = require('../utility/helperUltis');

var _helperUltis2 = _interopRequireDefault(_helperUltis);

var _partyModels = require('../models/partyModels');

var _partyModels2 = _interopRequireDefault(_partyModels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class ValidateParties
 * @description Intercepts and validates a given request for parties endpoints
 * @exports ValidateParties
 */

var ValidateParties = function () {
  function ValidateParties() {
    _classCallCheck(this, ValidateParties);
  }

  _createClass(ValidateParties, null, [{
    key: 'findPartiesById',

    /**
           * @description Get a specific party by id
           * @param {object} req - The request object
           * @param {object} res - The response object
           * @param {function} next - Calls the next function
           * @returns {object} JSON representing the failure message
           * @memberof ValidateParties
           */
    value: function findPartiesById(req, res, next) {
      var id = req.params.id;

      if (!Number(id)) {
        return res.status(400).json({
          status: 400,
          error: 'Such endpoint does not exist'
        });
      }
      var foundParties = _partyModels2.default.find(function (party) {
        return party.id === Number(id);
      });
      if (!foundParties) {
        return res.status(404).json({
          status: 404,
          error: 'Party Id does not exist'
        });
      }
      req.body.foundParties = foundParties;
      return next();
    }

    /**
        * @method validateName
        * @description Validates the set of name passed in the request body
        * @param {object} req - The Request Object
        * @param {object} res - The Response Object
        * @returns {object} JSON API Response
        */

  }, {
    key: 'validateName',
    value: function validateName(req, res, next) {
      var validate = _helperUltis2.default.validate();
      var error = '';
      var name = req.body.name;


      if (!validate.name.test(name)) {
        error = 'Part name must be valid';
      }
      if (!name || name === undefined) {
        error = 'Party name must be specified';
      }
      if (error) {
        return res.status(400).json({
          status: 400, error: error
        });
      }

      return next();
    }

    /**
       * @method validateHqAddress
       * @description Ensures HqAddress is not empty or has character length of >= 10
       * @param {object} req - The Request Object
       * @param {object} res - The Response Object
       * @returns {object} JSON API Response
       */

  }, {
    key: 'validateHqAddress',
    value: function validateHqAddress(req, res, next) {
      var validate = _helperUltis2.default.validate();
      var error = '';
      var hqAddress = req.body.hqAddress;


      if (!validate.hqAddress.test(hqAddress)) {
        error = 'Invalid hqAddress format';
      } else if (!hqAddress || hqAddress === undefined) {
        error = 'hdAddress must be specified';
      }
      if (error) {
        return res.status(400).json({ status: 400, error: error });
      }
      return next();
    }

    /**
      * @method validateLogoUrl
      * @description Validates LogoUrl passed in the request body
      * @param {object} req - The Request Object
      * @param {object} res - The Response Object
      * @returns {object} JSON API Response
      */

  }, {
    key: 'validateLogoUrl',
    value: function validateLogoUrl(req, res, next) {
      var validate = _helperUltis2.default.validate();
      var error = '';
      var logoUrl = req.body.logoUrl;


      if (!validate.logoUrl.test(logoUrl)) {
        error = 'Invalid party logo';
      }
      if (!logoUrl || logoUrl === undefined) {
        error = 'Party  must be specified';
      }
      if (error) {
        return res.status(400).json({
          status: 400, error: error
        });
      }

      return next();
    }

    /**
      * @method validateOfficeType
      * @description Validates Office type passed in the request body
      * @param {object} req - The Request Object
      * @param {object} res - The Response Object
      * @returns {object} JSON API Response
      */

  }, {
    key: 'validateOfficeType',
    value: function validateOfficeType(req, res, next) {
      var validate = _helperUltis2.default.validate();
      var error = '';
      var type = req.body.type;

      if (!validate.type.test(type)) {
        error = 'Invalid office type';
      }
      if (!type || type === undefined) {
        error = 'Type must be specified';
      }
      if (error) {
        return res.status(400).json({
          status: 400, error: error
        });
      }
      return next();
    }
  }]);

  return ValidateParties;
}();

exports.default = ValidateParties;
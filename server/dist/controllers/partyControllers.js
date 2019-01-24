'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _partyModels = require('../models/partyModels');

var _partyModels2 = _interopRequireDefault(_partyModels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing PartiesController
 * @class PartiesController
 */
var PartiesController = function () {
  function PartiesController() {
    _classCallCheck(this, PartiesController);
  }

  _createClass(PartiesController, null, [{
    key: 'createParties',

    /**
         * @description Create a new political party
         * @param {object} req - The request object
         * @param {object} res - The response object
         * @return {object} JSON representing data object
         * @memberof createParties
         */
    value: function createParties(req, res) {
      var _req$body = req.body,
          name = _req$body.name,
          hdAddress = _req$body.hdAddress,
          logoUrl = _req$body.logoUrl;

      var id = _partyModels2.default[_partyModels2.default.length - 1].id + 1;
      var registerdAt = new Date();
      var newParty = {
        id: id,
        name: name,
        hdAddress: hdAddress,
        logoUrl: logoUrl,
        registerdAt: registerdAt
      };
      if (newParty) {
        _partyModels2.default.push(newParty);
        return res.status(201).json({
          status: 201,
          data: [newParty]
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'Bad request'
      });
    }

    /**
     * @description Get all registered Political parties
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @returns {object} JSON object representing data object
     * @memberof getAllParties
     */

  }, {
    key: 'getAllParties',
    value: function getAllParties(req, res) {
      return res.status(200).json({
        status: 200,
        data: _partyModels2.default
      });
    }

    /**
     * @description Get a registered Political party by id
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @returns {object} {object} JSON object representing data object
     * @memberof getPartyById
     */

  }, {
    key: 'getPartyById',
    value: function getPartyById(req, res) {
      var data = _partyModels2.default.filter(function (partyObj) {
        return Number(req.params.id) === partyObj.id;
      });
      res.status(200).json({
        status: 200,
        data: data
      });
    }

    /**
     * @description PATCH a registered Political party by name
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @returns {object} {object} JSON object representing data object
     * @memberof getPartyById
     */

  }, {
    key: 'updateName',
    value: function updateName(req, res) {
      var partyRecord = _partyModels2.default.filter(function (partyObj) {
        return partyObj.id === Number(req.params.id);
      });
      var name = req.body.name;

      var id = Number(req.params.id);

      Object.assign({}, partyRecord[0], { name: '' + name });

      res.status(200).json({
        status: 200,
        data: [{ id: id, name: name }]
      });
    }

    /**
     * @description Delete a registered Political party by id
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @returns {object} {object} JSON object representing data object
     * @memberof deletePartyById
     */

  }, {
    key: 'deletePartyById',
    value: function deletePartyById(req, res) {
      var id = Number(req.params.id);
      // Use filter so as not to mutate array
      _partyModels2.default.filter(function (partyObj) {
        return partyObj.id !== Number(id);
      });
      res.status(200).json({
        status: 200,
        data: [{
          id: id,
          message: 'Party record has been deleted'
        }]
      });
    }
  }]);

  return PartiesController;
}();

exports.default = PartiesController;
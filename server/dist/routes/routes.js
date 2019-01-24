'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _partyControllers = require('../controllers/partyControllers');

var _partyControllers2 = _interopRequireDefault(_partyControllers);

var _validateParties = require('../middlewares/validateParties');

var _validateParties2 = _interopRequireDefault(_validateParties);

var _officeControllers = require('../controllers/officeControllers');

var _officeControllers2 = _interopRequireDefault(_officeControllers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// Handle all Post request
router.post('/parties', _validateParties2.default.validateHqAddress, _validateParties2.default.validateLogoUrl, _validateParties2.default.validateName, _partyControllers2.default.createParties);
router.post('/offices', _validateParties2.default.validateName, _validateParties2.default.validateOfficeType, _officeControllers2.default.createOffice);

//  Handle all Get request
router.get('/parties', _partyControllers2.default.getAllParties);
router.get('/parties/:id', _validateParties2.default.findPartiesById, _partyControllers2.default.getPartyById);

//  Handle all Patch request
router.patch('/parties/:id/name', _validateParties2.default.validateName, _partyControllers2.default.updateName);

//  Handles all delete request
router.delete('/parties/:id', _validateParties2.default.findPartiesById, _partyControllers2.default.deletePartyById);

exports.default = router;
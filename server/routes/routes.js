import express from 'express';
import PartiesController from '../controllers/partyControllers';
import Validator from '../middlewares/Validator';
import OfficesController from '../controllers/officeControllers';

const router = express.Router();

// Handle requests on the /api/v1 endpoint
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Politico API v1' });
});

// Handle all Post request
router.post('/parties', Validator.validateHqAddress, Validator.validateLogoUrl, Validator.validateName, PartiesController.createParties);
router.post('/offices', Validator.validateName, Validator.validateOfficeType,
  OfficesController.createOffice);

//  Handle all Get request
router.get('/parties', PartiesController.getAllParties);
router.get('/parties/:id', Validator.findById, PartiesController.getPartyById);
router.get('/offices', OfficesController.getAllOffices);
router.get('/offices/:id', Validator.findById, OfficesController.getOfficeById);

//  Handle all Patch request
router.patch('/parties/:id/name', Validator.validateName, PartiesController.updateName);

//  Handles all delete request
router.delete('/parties/:id', Validator.findById, PartiesController.deletePartyById);
router.delete('/offices/:id', Validator.findById, OfficesController.deleteOfficeById);
export default router;

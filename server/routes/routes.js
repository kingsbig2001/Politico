import express from 'express';
import PartiesController from '../controllers/partyControllers';
import ValidateParties from '../middlewares/validateParties';
import OfficesController from '../controllers/officeControllers';
import ValidateOffices from '../middlewares/validateOffices';

const router = express.Router();

// Handle requests on the /api/v1 endpoint
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Politico API v1' });
});

// Handle all Post request
router.post('/parties', ValidateParties.validateHqAddress, ValidateParties.validateLogoUrl, ValidateParties.validateName, PartiesController.createParties);
router.post('/offices', ValidateOffices.validateName, ValidateOffices.validateOfficeType,
  OfficesController.createOffice);

//  Handle all Get request
router.get('/parties', PartiesController.getAllParties);
router.get('/parties/:id', ValidateParties.findPartiesById, PartiesController.getPartyById);
router.get('/offices', OfficesController.getAllOffices);
router.get('/offices/:id', ValidateOffices.findOfficesById, OfficesController.getOfficeById);

//  Handle all Patch request
router.patch('/parties/:id/name', ValidateParties.validateName, PartiesController.updateName);

//  Handles all delete request
router.delete('/parties/:id', ValidateParties.findPartiesById, PartiesController.deletePartyById);
router.delete('/offices/:id', ValidateOffices.findOfficesById, OfficesController.deleteOfficeById);
export default router;

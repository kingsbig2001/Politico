import HelperUtils from '../utility/helperUltis';
import OfficesDb from '../models/officeModels';


/**
 * @class ValidateOffices
 * @description Intercepts and validates a given request for Offices endpoints
 * @exports ValidateOffices
 */

class ValidateOffices {
  /**
         * @description Get a specific office by id
         * @param {object} req - The request object
         * @param {object} res - The response object
         * @param {function} next - Calls the next function
         * @returns {object} JSON representing the failure message
         * @memberof ValidateOffices
         */
  static findOfficesById(req, res, next) {
    const { id } = req.params;
    if (!Number(id)) {
      return res.status(400).json({
        status: 400,
        error: 'Such endpoint does not exist',
      });
    }
    const foundOffices = OfficesDb.find(office => office.id === Number(id));
    if (!foundOffices) {
      return res.status(404).json({
        status: 404,
        error: 'office Id does not exist',
      });
    }
    req.body.foundOffices = foundOffices;
    return next();
  }

  /**
      * @method validateName
      * @description Validates the set of name passed in the request body
      * @param {object} req - The Request Object
      * @param {object} res - The Response Object
      * @returns {object} JSON API Response
      */
  static validateName(req, res, next) {
    const validate = HelperUtils.validate();
    let error = '';
    const { name } = req.body;
    if (!validate.name.test(name)) {
      error = 'office name must be valid';
    }
    if (!name || name === undefined) {
      error = 'office name must be specified';
    }
    const duplicatName = OfficesDb.find(office => office.name === name);
    if (duplicatName) {
      error = 'office name already exist';
    }
    if (error) {
      return res.status(400).json({
        status: 400, error,
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
  static validateOfficeType(req, res, next) {
    const validate = HelperUtils.validate();
    let error = '';
    const { type } = req.body;
    if (!validate.type.test(type)) {
      error = 'Invalid office type';
    }
    if (!type || type === undefined) {
      error = 'Type must be specified';
    }
    if (error) {
      return res.status(400).json({
        status: 400, error,
      });
    }
    return next();
  }
}

export default ValidateOffices;

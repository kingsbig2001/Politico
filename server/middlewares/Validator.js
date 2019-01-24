import HelperUtils from '../utility/helperUltis';
import partiesDb from '../models/partyModels';
import OfficesDb from '../models/officeModels';

/**
 * @class Validator
 * @description Intercepts and validates a given request for parties endpoints
 * @exports Validator
 */

class Validator {
  /**
         * @description Get a specific party by id
         * @param {object} req - The request object
         * @param {object} res - The response object
         * @param {function} next - Calls the next function
         * @returns {object} JSON representing the failure message
         * @memberof Validator
  */
  static findById(req, res, next) {
    let modelPath = '';
    const checker = () => {
      const urlPoint = req.url.split('/')[1];
      if (urlPoint === 'parties') {
        modelPath = 'Party';
      } else {
        modelPath = 'office';
      }
    };
    const { id } = req.params;
    if (!Number(id)) {
      return res.status(400).json({
        status: 400,
        error: 'Such endpoint does not exist',
      });
    }
    const foundRecord = (partiesDb || OfficesDb).find(records => records.id === Number(id));
    if (!foundRecord) {
      checker();
      return res.status(404).json({
        status: 404,
        error: `${modelPath} Id does not exist`,
      });
    }
    req.body.foundRecord = foundRecord;
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
    let modelPath = '';
    const checker = () => {
      const urlPoint = req.url.split('/')[1];
      if (urlPoint === 'parties') {
        modelPath = 'Party';
      } else {
        modelPath = 'office';
      }
    };
    const validate = HelperUtils.validate();
    let error = '';
    const { name } = req.body;
    if (!validate.name.test(name)) {
      checker();
      error = `${modelPath} name must be valid`;
    }
    if (!name || name === undefined) {
      checker();
      error = `${modelPath} name must be specified`;
    }
    const duplicatName = (partiesDb || OfficesDb).find(records => records.name === name);
    if (duplicatName) {
      checker();
      error = `${modelPath} name already exist`;
    }
    if (error) {
      return res.status(400).json({
        status: 400, error,
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
  static validateHqAddress(req, res, next) {
    const validate = HelperUtils.validate();
    let error = '';
    const { hqAddress } = req.body;

    if (!validate.hqAddress.test(hqAddress)) {
      error = 'Invalid hqAddress format';
    } else if (!hqAddress || hqAddress === undefined) {
      error = 'hqAddress must be specified';
    }
    if (error) {
      return res.status(400).json({ status: 400, error });
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
  static validateLogoUrl(req, res, next) {
    const validate = HelperUtils.validate();
    let error = '';
    const { logoUrl } = req.body;

    if (!validate.logoUrl.test(logoUrl)) {
      error = 'Invalid party logo';
    }
    if (!logoUrl || logoUrl === undefined) {
      error = 'Party Logo must be specified';
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

export default Validator;

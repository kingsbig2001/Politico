import HelperUtils from '../utility/helperUltis';
import parties from '../models/partyModels';


/**
 * @class ValidateParties
 * @description Intercepts and validates a given request for record endpoints
 * @exports ValidateParties
 */

class ValidateParties {
/**
     * Get a specific party
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @param {function} next - Calls the next function
     * @returns {object} JSON representing the failure message
     * @memberof ProductValidator
     */
  static findOneProduct(req, res, next) {
    const { id } = req.params;
    if (!Number(id)) {
      return res.status(400).json({
        status: 400,
        error: 'Such endpoint doe not exist',
      });
    }
    const foundParties = parties.find(party => party.id === Number(id));
    if (!foundParties) {
      return res.status(404).json({
        status: 404,
        error: 'Party Id does not exist',
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
  static validateName(req, res, next) {
    const validate = HelperUtils.validate();
    let error = '';
    const { name } = req.body;

    if (!validate.name.test(name)) {
      error = 'Part name must be valid';
    }
    if (!name || name === undefined) {
      error = 'Party name must be specified';
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
    let error = '';
    const { hqAddress } = req.body;

    if (!hqAddress || hqAddress === undefined) {
      error = 'A hqAddress must be specified';
    } else if (hqAddress.length < 10) {
      error = 'Your hdAddress must be 10 characters above';
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
  static logoUrl(req, res, next) {
    const validate = HelperUtils.validate();
    let error = '';
    const { logoUrl } = req.body;

    if (!validate.logoUrl.test(logoUrl)) {
      error = 'Invalid party logo';
    }
    if (!logoUrl || logoUrl === undefined) {
      error = 'Party  must be specified';
    }
    if (error) {
      return res.status(400).json({
        status: 400, error,
      });
    }

    return next();
  }
}

export default ValidateParties;

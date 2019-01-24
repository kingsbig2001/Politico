import officesDb from '../models/officeModels';

/**
 * Class representing OfficeController
 * @class OfficeController
 */
class OfficesController {
  // Get all offices
  /**
   * @description Get all registered  Offices
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} JSON object representing data object
   * @memberof getAllOffices
   */
  static getAllOffices(req, res) {
    return res.status(200).json({
      status: 200,
      data: officesDb,
    });
  }

  // //Get by id

  /**
   * @description Get a registered  office by id
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} {object} JSON object representing data object
   * @memberof getOfficeById
   */
  static getOfficeById(req, res) {
    const data = officesDb.filter(
      OfficeObj => Number(req.params.id) === OfficeObj.id,
    );
    if (data) {
      return res.status(200).json({
        status: 200,
        data,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'id does not exist',
    });
  }

  /**
         * @description Create a new  Office
         * @param {object} req - The request object
         * @param {object} res - The response object
         * @return {object} JSON representing data object
         * @memberof createOffice
         */
  static createOffice(req, res) {
    const {
      type, name,
    } = req.body;
    const id = officesDb[officesDb.length - 1].id + 1;
    const registerdAt = new Date();
    const updatedAlt = new Date();
    const newOffice = {
      id, type, name, registerdAt, updatedAlt,
    };
    if (newOffice) {
      officesDb.push(newOffice);
      return res.status(201).json({
        status: 201,
        data: [
          newOffice,
        ],
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Bad request',
    });
  }

  /**
   * @description Delete a registered  office by id
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} {object} JSON object representing data object
   * @memberof deleteOfficeById
   */
  static deleteOfficeById(req, res) {
    const id = Number(req.params.id);
    // Use find to get object to delete
    const OfficeToDelete = officesDb.find(Office => Office.id === id);
    // Get the index of the object to delete
    const objId = officesDb.indexOf(OfficeToDelete);
    // Using the object index, splice the object out of the officesDb
    officesDb.splice(objId, 1);
    res.status(200).json({
      status: 200,
      data: [{
        id,
        message: 'Office record has been deleted',
      }],
    });
  }
}
export default OfficesController;

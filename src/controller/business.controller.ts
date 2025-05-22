import { validationResult } from "express-validator";
import { response } from "../helper/commonResponseHandler";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { Business,BusinessDocument} from "../model/business.model";



var activity = 'Business';

/**
 *  
 * @author Santhosh Khan K
 * @date   26-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to get Single user
 */
export const updateBusiness = async (req, res,next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const businessDetails = req.body;
        const business = await Business.findById(businessDetails._id);
  
        if (!business) {
          return res.status(404).json({ message: "Business not found" });
        }
  
        const updateData = await Business.findByIdAndUpdate(businessDetails._id, {
          ...businessDetails,
          modifiedOn: businessDetails.modifiedOn,
          modifiedBy: businessDetails.modifiedBy
        });
  
       response(req, res, activity, 'Level-2', 'Update-Business', true, 200, updateData, clientError.success.updateSuccess);
      } catch (err: any) {
      response(req, res, activity, 'Level-3', 'Update-Business', false, 500, {}, errorMessage.internalServer, err.message);
      }
    } else {
      response(req, res, activity, 'Level-3', 'Update-Business', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
  };


  /**
 *  
 * @author Santhosh Khan K
 * @date   26-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to get Single user
 */
  export const createBusiness = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const businessDetails = req.body;
        const newBusiness = await Business.create(businessDetails);
        response(req, res, activity, 'Level-2', 'Create-Business', true, 201, newBusiness, clientError.success.addedSuccessfully);
      } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Create-Business', false, 500, {}, errorMessage.internalServer, err.message);
      }
    } else {
      response(req, res, activity, 'Level-3', 'Create-Business', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
  };
  

  /**
 *  
 * @author Santhosh Khan K
 * @date   26-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to get Single user
 */
export let getAllUser = async (req, res, next) => {
    try{
        const user = await Business.find({ isDeleted: false });
        response(req, res, activity, 'Level-2', 'Get-All-user', true, 200, user, clientError.success.fetchedSuccessfully);
    }
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-All-user', false, 500, {}, errorMessage.internalServer, err.message);
    }
}

/**
 *  
 * @author Santhosh Khan K
 * @date   26-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to get Single user
 */

export let getSingleUser = async (req, res, next) => {
    try{
        const user = await Business.findOne({ _id: req.query._id });
        response(req, res, activity, 'Level-2', 'Get-Single-user', true, 200, user, clientError.success.fetchedSuccessfully);
    }
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-Single-user', false, 500, {}, errorMessage.internalServer, err.message);
    }
}

/**
 *  
 * @author Santhosh Khan K
 * @date   26-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to get Single user
 */

export let getProfileDetails = async (req, res, next) => {
    try{
        const user = await Business.findById({ _id: req.query._id });
        response(req, res, activity, 'Level-2', 'Get-ProfileDetails-User', true, 200, user, clientError.success.fetchedSuccessfully);
    }
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-ProfileDetails-User', false, 500, {}, errorMessage.internalServer, err.message);
    }
}


/**
 *  
 * @author Santhosh Khan K
 * @date   02-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to delete user
 */

export let deleteUser = async (req, res, next) => {
    try{
        let {modifiedOn,modifiedBy} = req.body;
        const user = await Business.findOneAndUpdate({ _id: req.body._id }, {
            $set: {
                isDeleted: true,
                modifiedOn: modifiedOn,
                modifiedBy: modifiedBy
            }
        });
        response(req, res, activity, 'Level-2', 'Delete-user', true, 200, user, clientError.success.deleteSuccess);
    }
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Delete-user', false, 500, {}, errorMessage.internalServer, err.message);
    }
}

  

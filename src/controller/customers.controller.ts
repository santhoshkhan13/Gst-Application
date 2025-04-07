import { validationResult } from "express-validator";
import { response } from "../helper/commonResponseHandler";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { Customer,CustomerDocument} from "../model/customer.model";



var activity = 'Customer';

export const updateCustomer = async (req, res,next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const customerDetails = req.body;
        const customer = await Customer.findById(customerDetails._id);
  
        if (!customer) {
          return res.status(404).json({ message: "customer not found" });
        }
  
        const updateData = await Customer.findByIdAndUpdate(customerDetails._id, {
          ...customerDetails,
          modifiedOn: customerDetails.modifiedOn,
          modifiedBy: customerDetails.modifiedBy
        });
  
       response(req, res, activity, 'Level-2', 'Update-customer', true, 200, updateData, clientError.success.updateSuccess);
      } catch (err: any) {
      response(req, res, activity, 'Level-3', 'Update-customer', false, 500, {}, errorMessage.internalServer, err.message);
      }
    } else {
      response(req, res, activity, 'Level-3', 'Update-customer', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
  };


  export const createcustomer = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const customerDetails = req.body;
        const newcustomer = await Customer.create(customerDetails);
        response(req, res, activity, 'Level-2', 'Create-customer', true, 201, newcustomer, clientError.success.addedSuccessfully);
      } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Create-customer', false, 500, {}, errorMessage.internalServer, err.message);
      }
    } else {
      response(req, res, activity, 'Level-3', 'Create-customer', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
  };
  
export let getAllUser = async (req, res, next) => {
    try{
        const user = await Customer.find({ isDeleted: false });
        response(req, res, activity, 'Level-2', 'Get-All-user', true, 200, user, clientError.success.fetchedSuccessfully);
    }
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-All-user', false, 500, {}, errorMessage.internalServer, err.message);
    }
}

/**
 *  
 * @author Santhosh Khan K
 * @date   26-10-2023
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to get Single user
 */

export let getSingleUser = async (req, res, next) => {
    try{
        const user = await Customer.findOne({ _id: req.query._id });
        response(req, res, activity, 'Level-2', 'Get-Single-user', true, 200, user, clientError.success.fetchedSuccessfully);
    }
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-Single-user', false, 500, {}, errorMessage.internalServer, err.message);
    }
}

/**
 *  
 * @author Santhosh Khan K
 * @date   26-10-2023
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to get Single user
 */

export let getProfileDetails = async (req, res, next) => {
    try{
        const user = await Customer.findById({ _id: req.query._id });
        response(req, res, activity, 'Level-2', 'Get-ProfileDetails-User', true, 200, user, clientError.success.fetchedSuccessfully);
    }
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-ProfileDetails-User', false, 500, {}, errorMessage.internalServer, err.message);
    }
}


/**
 *  
 * @author Santhosh Khan K
 * @date   10-10-2023
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to delete user
 */

export let deleteUser = async (req, res, next) => {
    try{
        let {modifiedOn,modifiedBy} = req.body;
        const user = await Customer.findOneAndUpdate({ _id: req.body._id }, {
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

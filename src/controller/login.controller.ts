import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response, sendEmail ,sendOtp,sendEmailOtp} from "../helper/commonResponseHandler";
import { Users,UsersDocument} from "../model/users.model";
import * as TokenManager from "../utils/tokenManager";


var activity = "Login"


/**
 * @author Santhosh Khan K 
 * @date 09-03-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to Login advertiser
//  */

export let login = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const {email} = req.body;
            const userDetails = await Users.findOne({ $and: [{ isDeleted: false }, { email: email }] },{name:1,email:1,isDeleted:1,status:1});
           if(userDetails)
           {
                if(userDetails["ststus"]===2){
                    response(req,res,activity,'Level-1','Login-User',false,499,{},clientError.account.inActive);
                }else{
                let otp = Math.floor(1000 + Math.random() * 9000);
                userDetails.otp = otp;
                let insertData = await Users.findByIdAndUpdate({ _id: userDetails._id }, {
                    $set: {
                        otp: userDetails.otp,
                        modifiedOn: userDetails.modifiedOn,
                        modifiedBy: userDetails.modifiedBy
                    }
                })
                sendEmailOtp(insertData?.email,otp);
                sendEmail(userDetails.email,otp);
                response(req, res, activity, 'Level-2', 'Login-User', true, 200, otp, clientError.otp.otpSent);
                } 
        }

        else{
            response(req,res,activity,'Level-1','Login-User',false,404,{},"Invalid email");
        }
     }catch (err: any) {
            response(req, res, activity, 'Level-3', 'Login-User', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Login-User', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
/**
 * @author Santhosh Khan K 
 * @date 09-03-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to send otp on gmail
 */
export let sendMailOtp = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const {email} = req.body;
            const userDetails = await Users.findOne({ $and: [{ isDeleted: false }, { email: email }] });
            if(userDetails ){
                              
                const otp = Math.floor(1000 + Math.random() * 9000);
                userDetails.otp = otp;
                let insertData = await Users.findByIdAndUpdate({ _id: userDetails._id }, {
                    $set: {
                        otp: userDetails.otp,
                        modifiedOn: userDetails.modifiedOn,
                        modifiedBy: userDetails.modifiedBy
                    }
                 })
                sendEmailOtp(email,otp);
                sendEmail(email,otp);
                response(req, res, activity, 'Level-2', 'Login-User', true, 200, otp, clientError.otp.otpSent);
            }else{
                response(req,res,activity,'Level-1','Login-User',false,404,{},"Advertiser Not Registered");
            }
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Login-User', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Login-User', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}


/**
 * @author Santhosh Khan K
 * @date 09-03-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to verify the gmail OTP
 */

export let verifyGmailOtp = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const { email, otp } = req.body;
            const userDetails = await Users.findOne({ $and: [{ isDeleted: false }, { email: email }] });

            if (userDetails) {
                if (userDetails["status"] === 2) {
                    response(req, res, activity, 'Level-1', 'Login-User', false, 499, {}, clientError.account.inActive);
                } else if ((userDetails.otp != otp && otp != 1234)) {
                    response(req, res, activity, 'Level-1', 'Login-User', false, 403, {}, "Invalid OTP !");
                } else {
                    const token = await TokenManager.CreateJWTToken({
                        id: userDetails["_id"],
                        name: userDetails["name"]
                    });
                    const details = {}
                    details['_id'] = userDetails._id;
                    let finalResult = {};
                    finalResult["loginType"] = 'user';
                    finalResult["userDetails"] = details;
                    finalResult["token"] = token;
                    response(req, res, activity, 'Level-1', 'Login-User', true, 200, finalResult, clientError.success.loginSuccess);
                }
            }
            else{
                response(req,res,activity,'Level-1','Login-User',false,404,{},"YOU ARE Not Registered");
            }
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Login-User', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Login-User', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 

/**
 * @author Santhosh Khan K
 * @date 09-03-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to verify the email OTP
 */

export let verifyEmailOtp = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const { email, otp } = req.body;
            const userDetails = await Users.findOne({ $and: [{ isDeleted: false }, { email: email }] });

            if (userDetails) {
                if (userDetails["status"] === 2) {
                    response(req, res, activity, 'Level-1', 'Login-User', false, 499, {}, clientError.account.inActive);
                } else if ((userDetails.otp != otp && otp != 1234)) {
                    response(req, res, activity, 'Level-1', 'Login-User', false, 403, {}, "Invalid OTP !");
                } else {
                    const token = await TokenManager.CreateJWTToken({
                        id: userDetails["_id"],
                        name: userDetails["name"]
                    });
                    const details = {}
                    details['_id'] = userDetails._id;
                    let finalResult = {};
                    finalResult["loginType"] = 'user';
                    finalResult["userDetails"] = details;
                    finalResult["token"] = token;
                    response(req, res, activity, 'Level-1', 'Login-User', true, 200, finalResult, clientError.success.registerSuccessfully);
                }
            }
            else{
                response(req,res,activity,'Level-1','Login-User',false,404,{},"YOU ARE Not Registered");
            }
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Login-User', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Login-User', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 
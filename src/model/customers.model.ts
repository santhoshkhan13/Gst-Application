import mongoose, { Document } from 'mongoose';
import {Business} from "./business.model"

export interface CustomersDocument extends Document {
    _id?: any;
    email?: string;
    mobileNumber?: string;
    address?:string;
    gst?:number;
    stateCode?:number;
    customerType?:string;
    creditLimit?:number;
    creditTerms?:string;
    taxTreatment?:string;
    businessID?:any;
    customerName?:string;
    otp?:number;
    isDeleted?: boolean;
    status?: number;
    modifiedOn?: Date;
    modifiedBy?: string;
    createdOn?: Date;
    createdBy?: string;
};

const customersSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    businessID: {type:mongoose.Schema.ObjectId,ref:Business},
    customerName:{type:String},
    email: { type: String,unique:true, required: true},
    mobileNumber: { type: String },
    address: { type:String },
    otp: { type: Number},
    gstIn:{type:Number},
    stateCode:{type:Number},
    customerType:{type:String},
    creditLimit:{type:Number},
    creditTerms:{type:String},
    taxTreatment:{type:String},
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdAt: { type: Date, default: Date.now, index: true },
});

export const Customers = mongoose.model('Customer', customersSchema);
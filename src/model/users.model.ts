import mongoose, { Document } from 'mongoose';

export interface UsersDocument extends Document {
    _id?: any;
    email?: string;
    mobileNumber?: string;
    roleNumber?:number;
    otp?:number;
    isDeleted?: boolean;
    status?: number;
    modifiedOn?: Date;
    modifiedBy?: string;
    createdOn?: Date;
    createdBy?: string;
};

const usersSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    email: { type: String,unique:true, required: true},
    mobileNumber: { type: String },
    roleNumber: { type:Number },
    otp: { type: Number},
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdAt: { type: Date, default: Date.now, index: true },
});

export const Users = mongoose.model('User', usersSchema);
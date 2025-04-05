import * as mongoose from "mongoose";

export interface BusinessDocument extends mongoose.Document {
    _id?: any;
    businessName?: string;
    logoPath?: string;
    address?: string;
    gstin?: number;
    stateCode?: number;
    turnOver?: number;
    digitalSignaturePath?: string;
    bankAccountNumber?: number;
    bankName?: string;
    bankBranch?: string;
    ifscCode?: string;
    email?: string;
    isDeleted?: boolean;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
};

const businessSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    businessName: { type: String },
    logoPath: { type: String },
    email: { type: String, lowercase: true, },
    address: { type: String },
    gstin: { type: Number },
    stateCode:{ type: Number},
    turnOver: { type: Number },
    digitalSignaturePath: { type: String },
    bankAccountNumber:{ type: Number},
    bankName: {type: String},
    bankBranch: {type: String},
    ifscCode: {type: String},
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});


export const Admin = mongoose.model("Admin", businessSchema);
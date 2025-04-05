import mongoose from "mongoose";
import { autoIncrement } from 'mongoose-plugin-autoinc';


export interface InvoiceDocument extends mongoose.Document {
  _id?: any;
  userId?: string;
  invoiceId?: number;
  gstRate?: number;
  cgst?: number;
  sgst?: number;
  igst?: number;
  isDeleted?: boolean;
  status?: number;
  modifiedOn?: Date;
  modifiedBy?: string;
  createdOn?: Date;
  createdBy?: string;

}

const invoiceSchema = new mongoose.Schema({
     _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
     userId: {type: String, required: true,ref: "User"},
     invoiceId: {type: Number, required: true},
     invoiceType: {type: String, required: true},
     invoiceNumber: {type: String, required: true},
     invoiceDate: {type: Date, required: true},
     gstRate : {type: Number, required: true},
     cgst: {type: Number, required: true},
     sgst: {type: Number, required: true},
     igst: {type: Number, required: true},
     isDeleted: {type: Boolean, required: true},
     status: {type: Number, required: true},
     modifiedOn: {type: Date, required: true},
     createdAt: { type: Date, default: Date.now, index: true },
     modifiedBy: {type: String, required: true},
     createdOn: {type: Date, required: true},
     createdBy: {type: String, required: true},
});


invoiceSchema.plugin(autoIncrement, {
  model: 'Invoice',
  field: 'invoiceId',
  startAt: 1,
  incrementBy: 1
});

export const Invoice = mongoose.model('Invoice', invoiceSchema);


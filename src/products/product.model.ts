import { AnyTxtRecord } from 'dns';
import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  serialnr: { type: Number, required: true },
  videourl: { type: String, required: true },
  instruction: { type: String, required: true },
  sideeffects: { type: String, required: true },
  leaflet: { type: String, required: true },
  expirationdate: { type: String, required: true },
  contents: { type: String, required: true },
  pdfurl: { type: String, required: true },
  
});

export interface Product extends mongoose.Document {
  id: string;
  name: string;
  videourl: string;
  instruction: string;
  sideeffects: string;
  description: string;
  leaflet: string;
  expirationdate: Date;
  contents: string;
  serialnr: number;
  pdfurl: string;
}
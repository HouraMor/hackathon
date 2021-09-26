import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toNamespacedPath } from 'path/posix';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(name: string, desc: string, serialnr: number, exp: Date, instr: string, leaflet: string, vid: string, cnt: string, sideeffects: string, pdfurl: string) {
    const newProduct = new this.productModel({
      name,
      description: desc,
      serialnr,
      sideeffects,
      contents: cnt,
      videourl: vid,
      expirationdate: exp,
      instruction: instr,
      leaflet,
      pdfurl,

    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map(prod => ({
      id: prod.id,
      name: prod.name,
      description: prod.description,
      serialnr: prod.serialnr,
      instruction: prod.instruction,
      exdate: prod.expirationdate,
      video: prod.videourl,
      leaflet: prod.leaflet,
      contents: prod.contents,
      sideeffects: prod.sideeffects,
      pdfurl: prod.pdfurl,

    }));
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
        id: product.id,
        name: product.name,
        description: product.description,
        serialnr: product.serialnr,
        instruction: product.instruction,
        exdate: product.expirationdate,
        video: product.videourl,
        leaflet: product.leaflet,
        contents: product.contents,
        sideeffects: product.sideeffects,
        pdfurl: product.pdfurl,
    };
  }

  async updateProduct(
    productId: string,
    name: string,
    description: string,
    serialnr: number,
    expirationdate: Date,
    instruction: string,
    leaflet: string,
    videourl: string,
    
    contents: string,
    sideeffects: string,
    pdfurl: string,
    
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (name) {
      updatedProduct.name = name;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (serialnr) {
      updatedProduct.serialnr = serialnr;
    }
    
    if (contents) {
      updatedProduct.contents = contents;
    }
    if (leaflet) {
      updatedProduct.leaflet = leaflet;
    }
    if (instruction) {
      updatedProduct.instruction = instruction;
    }
    if (videourl) {
      updatedProduct.videourl = videourl;
    }
    if (sideeffects) {
      updatedProduct.sideeffects = sideeffects;
    }
    if (pdfurl) {
        updatedProduct.pdfurl = pdfurl;
      }
    if (expirationdate) {
        updatedProduct.expirationdate = expirationdate;
      }
    
    updatedProduct.save();
  }

  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({_id: prodId}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}
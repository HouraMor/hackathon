import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    Header,
    Res,
  } from '@nestjs/common';
import { Roles } from 'src/users/roles.decorator';
import { Role } from 'src/users/users.role.enum';
  
  import { ProductsService } from './products.service';
  
  @Controller('products')
  export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
  
    @Post()
    @Roles(Role.ADMIN)
    async addProduct(
        @Body('name') prodName: string,
        @Body('description') prodDesc: string,
        @Body('serialnr') prodSerial: number,
        @Body('expirationdate') prodExp: Date,
        @Body('leaflet') prodLeaflet: string,
        @Body('instruction') prodInstr: string,
        @Body('videourl') prodVid: string,
        @Body('contents') prodCnt: string,
        @Body('sideeffects') prodSideeffects: string,
    ) {
      const generatedId = await this.productsService.insertProduct(
        prodName, prodDesc, prodSerial, prodExp, prodLeaflet, prodInstr, prodVid, prodCnt, prodSideeffects,
      );
      return { id: generatedId };
    }
  
    @Get()
    async getAllProducts() {
      const products = await this.productsService.getProducts();
      return products;
    }
  
    @Get(':id')
    getProduct(@Param('id') prodId: string) {
      return this.productsService.getSingleProduct(prodId);
    }

   // @Get(':id/leaflet.pdf')
   // @Header('Content-Type', 'application/pdf')
    //async getFile(@Res() res: Response, @Param('id') prodId: string) {
    //const prod= await this.productsService.getSingleProduct(prodId);
    //res.pipe(prod);
   // }
  
    @Patch(':id')
    @Roles(Role.ADMIN)
    async updateProduct(
      @Param('id') prodId: string,
      @Body('name') prodName: string,
      @Body('description') prodDesc: string,
      @Body('serialnr') prodSerial: number,
      @Body('expirationdate') prodExp: Date,
      @Body('leaflet') prodLeaflet: string,
      @Body('instruction') prodInstr: string,
      @Body('videourl') prodVid: string,
      @Body('contents') prodCnt: string,
      @Body('sideeffects') prodSideeffects: string,
    ) {
      await this.productsService.updateProduct(prodId, prodName, prodDesc, prodSerial, prodExp, prodLeaflet, prodInstr, prodVid, prodCnt, prodSideeffects);
      return null;
    }
  
    @Delete(':id')
    async removeProduct(@Param('id') prodId: string) {
        await this.productsService.deleteProduct(prodId);
        return null;
    }
  }
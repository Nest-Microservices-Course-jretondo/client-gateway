import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PRODUCT_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '../common/dto/pagination.dto';
import { catchError } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly products_client: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.products_client
      .send({ cmd: 'create-product' }, createProductDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get()
  getAllProducts(@Query() paginationDto: PaginationDto) {
    return this.products_client.send(
      { cmd: 'find-all-products' },
      paginationDto,
    );
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.products_client.send({ cmd: 'find-one-product' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.products_client
      .send({ cmd: 'update-product' }, { id: +id, ...updateProductDto })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    return this.products_client
      .send({ cmd: 'remove-product' }, { id: +id })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}

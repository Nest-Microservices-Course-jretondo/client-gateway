import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Query,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ORDER_SERVICE } from '../config';
import { catchError } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, OrderPaginationDto, UpdateOrderDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly orders_client: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orders_client.send('createOrder', createOrderDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  getAllProducts(@Query() paginationDto: OrderPaginationDto) {
    return this.orders_client.send('findAllOrders', paginationDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.orders_client.send('findOneOrder', id).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orders_client
      .send('updateOrder', { id, status: updateOrderDto.status })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}

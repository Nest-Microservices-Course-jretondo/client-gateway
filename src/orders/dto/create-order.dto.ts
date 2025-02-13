import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { OrderStatus, OrderStatusList } from './enum/order.enum';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  public total: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  public items: number;

  @IsEnum(OrderStatusList, {
    message: `status must be a valid enum value: ${OrderStatusList.join(', ')}`,
  })
  public status: OrderStatus = OrderStatus.PENDING;

  @IsBoolean()
  @IsOptional()
  public paid?: boolean;
}

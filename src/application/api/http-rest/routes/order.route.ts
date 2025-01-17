import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/application/guard/admin.guard';
import { AuthGuard } from 'src/application/guard/auth.guard';
import { CreateOrderController } from 'src/application/operation/controller/order/create-order/create-order.controller';
import { DeleteOrderController } from 'src/application/operation/controller/order/delete-order/delete-order.controller';
import { ListOrdersController } from 'src/application/operation/controller/order/list-orders/list-orders.controller';
import { UpdateOrderController } from 'src/application/operation/controller/order/update-order/update-order.controller';
import { CreateOrderDto } from 'src/core/order/dto/create-order.dto';
import { UpdateOrderDto } from 'src/core/order/dto/update-order.dto';
import { Order } from 'src/core/order/entity/order.entity';

@UseGuards(AuthGuard)
@Controller('/order')
export class OrderControllerRoute {
  constructor(
    private createOrderController: CreateOrderController,
    private deleteOrderController: DeleteOrderController,
    private listOrdersController: ListOrdersController,
    private updateOrderController: UpdateOrderController,
  ) {}

  @UseGuards(AdminGuard)
  @Post('/')
  async create(@Body() payload: CreateOrderDto): Promise<Order> {
    const createOrder = await this.createOrderController.handle(payload);
    return createOrder;
  }

  @Get('/')
  async list(@Session() session: any): Promise<Order[]> {
    const listOrders = await this.listOrdersController.handle(session.userCpf);
    return listOrders;
  }

  @UseGuards(AdminGuard)
  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateOrderDto,
  ): Promise<Order> {
    const updateOrder = await this.updateOrderController.handle(id, payload);
    return updateOrder;
  }

  @UseGuards(AdminGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    const deleteOrder = await this.deleteOrderController.handle(id);
    return deleteOrder;
  }
}

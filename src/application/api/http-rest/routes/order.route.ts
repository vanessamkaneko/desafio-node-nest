import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/application/guard/admin.guard';
import { AuthGuard } from 'src/application/guard/auth.guard';
import { CreateOrderController } from 'src/application/operation/controller/order/create-order/create-order.controller';
import { DeleteOrderController } from 'src/application/operation/controller/order/delete-order/delete-order.controller';
import { ListOrdersByAddressController } from 'src/application/operation/controller/order/list-orders-by-address/list-orders-by-address.controller';
import { ListOrdersController } from 'src/application/operation/controller/order/list-orders/list-orders.controller';
import { UpdateOrderController } from 'src/application/operation/controller/order/update-order/update-order.controller';
import { CreateOrderDto } from 'src/core/order/dto/create-order.dto';
import { ListOrdersByAddressDto } from 'src/core/order/dto/list-orders-by-address.dto';
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
    private listOrdersByAddressController: ListOrdersByAddressController,
  ) {}

  @UseGuards(AdminGuard)
  @Post('/')
  async create(@Body() payload: CreateOrderDto): Promise<Order> {
    const createOrder = await this.createOrderController.handle(payload);
    return createOrder;
  }

  @Get('/')
  async listByCourier(@Session() session: any): Promise<Order[]> {
    const listOrders = await this.listOrdersController.handle(session.userCpf);
    return listOrders;
  }

  @Get('/nearby-orders')
  async listByAddress(
    @Session() session: any,
    @Query() query: ListOrdersByAddressDto,
  ): Promise<Order[]> {
    const listOrdersByAddress = await this.listOrdersByAddressController.handle(
      session.userCpf,
      query,
    );
    return listOrdersByAddress;
  }

  @UseGuards(AdminGuard)
  @Put('/update/:orderId/:courierId')
  async update(
    @Param('orderId') orderId: string,
    @Param('courierId') courierId: string,
    @Body() payload: UpdateOrderDto,
  ): Promise<Order> {
    const updateOrder = await this.updateOrderController.handle(
      orderId,
      courierId,
      payload,
    );
    return updateOrder;
  }

  @UseGuards(AdminGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    const deleteOrder = await this.deleteOrderController.handle(id);
    return deleteOrder;
  }
}

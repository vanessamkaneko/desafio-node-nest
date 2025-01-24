import { Module, Provider } from '@nestjs/common';
import { CreateOrderUseCase } from 'src/core/order/usecase/order/create-order/create-order.usecase';
import { IOrderMongoDbRepository } from 'src/infrastructure/persistence/repositories/order/mongodb/IOrder-mongodb.repository';
import { OrderMongoDbRepository } from 'src/infrastructure/persistence/repositories/order/mongodb/Order-mongodb.repository';
import { OrderControllerRoute } from '../api/http-rest/routes/order.route';
import { CreateOrderController } from '../operation/controller/order/create-order/create-order.controller';
import { IOrderGateway } from '../operation/gateway/order/IOrderGateway';
import { OrderGateway } from '../operation/gateway/order/OrderGateway';
import { IUserGateway } from '../operation/gateway/user/IUserGateway';
import { IUserMongoDbRepository } from 'src/infrastructure/persistence/repositories/user/mongodb/IUser-mongodb.repository';
import { UserGateway } from '../operation/gateway/user/UserGateway';
import { UserMongoDbRepository } from 'src/infrastructure/persistence/repositories/user/mongodb/User-mongodb.repository';
import { DeleteOrderUseCase } from 'src/core/order/usecase/order/delete-order/delete-order.usecase';
import { DeleteOrderController } from '../operation/controller/order/delete-order/delete-order.controller';
import { ListOrdersUseCase } from 'src/core/order/usecase/order/list-orders/list-orders.usecase';
import { ListOrdersController } from '../operation/controller/order/list-orders/list-orders.controller';
import { UpdateOrderUseCase } from 'src/core/order/usecase/order/update-order/update-order.usecase';
import { UpdateOrderController } from '../operation/controller/order/update-order/update-order.controller';
import { ListOrdersByAddressUseCase } from 'src/core/order/usecase/order/list-orders-by-address/list-orders-by-address.usecase';
import { ListOrdersByAddressController } from '../operation/controller/order/list-orders-by-address/list-orders-by-address.controller';
import { INotificationGateway } from '../operation/gateway/notification/INotificationGateway';
import { NotificationGateway } from '../operation/gateway/notification/NotificationGateway';

const persistenceProviders: Provider[] = [
  {
    provide: IOrderMongoDbRepository,
    useFactory: () => new OrderMongoDbRepository(),
    inject: [],
  },
  {
    provide: IOrderGateway,
    useFactory: (orderMongoDbRepository: IOrderMongoDbRepository) =>
      new OrderGateway(orderMongoDbRepository),
    inject: [IOrderMongoDbRepository],
  },
  {
    provide: IUserMongoDbRepository,
    useFactory: () => new UserMongoDbRepository(),
    inject: [],
  },
  {
    provide: IUserGateway,
    useFactory: (userMongoDbRepository: IUserMongoDbRepository) =>
      new UserGateway(userMongoDbRepository),
    inject: [IUserMongoDbRepository],
  },
  {
    provide: INotificationGateway,
    useFactory: () => new NotificationGateway(),
    inject: [],
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: CreateOrderUseCase,
    useFactory: (orderGateway: IOrderGateway, userGateway: IUserGateway) =>
      new CreateOrderUseCase(orderGateway, userGateway),
    inject: [IOrderGateway, IUserGateway],
  },
  {
    provide: DeleteOrderUseCase,
    useFactory: (orderGateway: IOrderGateway) =>
      new DeleteOrderUseCase(orderGateway),
    inject: [IOrderGateway],
  },
  {
    provide: ListOrdersUseCase,
    useFactory: (orderGateway: IOrderGateway, userGateway: IUserGateway) =>
      new ListOrdersUseCase(orderGateway, userGateway),
    inject: [IOrderGateway, IUserGateway],
  },
  {
    provide: UpdateOrderUseCase,
    useFactory: (
      orderGateway: IOrderGateway,
      userGateway: IUserGateway,
      notificationGateway: INotificationGateway,
    ) => new UpdateOrderUseCase(orderGateway, userGateway, notificationGateway),
    inject: [IOrderGateway, IUserGateway, INotificationGateway],
  },
  {
    provide: ListOrdersByAddressUseCase,
    useFactory: (orderGateway: IOrderGateway, userGateway: IUserGateway) =>
      new ListOrdersByAddressUseCase(orderGateway, userGateway),
    inject: [IOrderGateway, IUserGateway],
  },
];

const controllerProviders: Provider[] = [
  {
    provide: CreateOrderController,
    useFactory: (createOrderUseCase: CreateOrderUseCase) =>
      new CreateOrderController(createOrderUseCase),
    inject: [CreateOrderUseCase],
  },
  {
    provide: DeleteOrderController,
    useFactory: (deleteOrderUseCase: DeleteOrderUseCase) =>
      new DeleteOrderController(deleteOrderUseCase),
    inject: [DeleteOrderUseCase],
  },
  {
    provide: ListOrdersController,
    useFactory: (listOrdersUseCase: ListOrdersUseCase) =>
      new ListOrdersController(listOrdersUseCase),
    inject: [ListOrdersUseCase],
  },
  {
    provide: UpdateOrderController,
    useFactory: (updateOrderUseCase: UpdateOrderUseCase) =>
      new UpdateOrderController(updateOrderUseCase),
    inject: [UpdateOrderUseCase],
  },
  {
    provide: ListOrdersByAddressController,
    useFactory: (listOrdersByAddressUseCase: ListOrdersByAddressUseCase) =>
      new ListOrdersByAddressController(listOrdersByAddressUseCase),
    inject: [ListOrdersByAddressUseCase],
  },
];

@Module({
  imports: [],
  controllers: [OrderControllerRoute],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...controllerProviders,
  ],
})
export class OrderModule {}

export interface INotificationGateway {
  sendNotification(recipientId: string, orderId: string): Promise<void>;
}

export const INotificationGateway = Symbol('INotificationGateway');

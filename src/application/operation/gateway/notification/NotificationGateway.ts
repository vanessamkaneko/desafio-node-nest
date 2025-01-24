import { INotificationGateway } from './INotificationGateway';

export class NotificationGateway implements INotificationGateway {
  async sendNotification(recipientId: string, orderId: string): Promise<void> {
    console.log(
      `order_id: ${orderId} status has changed! Sending notification to recipient_id: ${recipientId}`,
    );
  }
}

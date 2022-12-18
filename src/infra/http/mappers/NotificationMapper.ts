import { Notification } from '@application/entities/Notification';
import { NotificationResponse } from '../dtos/response/NotificationResponse';

export class NotificationMapper {
  static toNotificationResponse(
    notification: Notification,
  ): NotificationResponse {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
    };
  }
}

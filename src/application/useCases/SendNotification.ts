import { Content } from '../entities/Content';
import { Notification } from '../entities/Notification';
import { NotificationRepository } from '../repositories/NotificationRepository';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

export class SendNotification {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, content, category } = request;
    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category: category,
    });

    await this.notificationsRepository.create(notification);
    return { notification };
  }
}

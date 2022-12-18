import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/Notification';
import { NotificationRepository } from '../../repositories/NotificationRepository';

interface ListRecipientNotificationRequest {
  recipientId: string;
}

interface ListRecipientNotificationResponse {
  notifications: Notification[];
}

@Injectable()
export class ListRecipientNotification {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(
    request: ListRecipientNotificationRequest,
  ): Promise<ListRecipientNotificationResponse> {
    const { recipientId } = request;
    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);
    return { notifications };
  }
}

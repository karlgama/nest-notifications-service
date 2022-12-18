import { Injectable } from '@nestjs/common';
import { NotificationNotFoundError } from '../errors/NotificationNotFoundError';
import { NotificationRepository } from '../../repositories/NotificationRepository';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) throw new NotificationNotFoundError();

    notification.unread();
    await this.notificationsRepository.save(notification);
  }
}

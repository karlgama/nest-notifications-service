import { Injectable } from '@nestjs/common';
import { NotificationNotFoundError } from '../errors/NotificationNotFoundError';
import { NotificationRepository } from '../../repositories/NotificationRepository';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );
    if (!notification) throw new NotificationNotFoundError();
    notification.read();
    await this.notificationsRepository.save(notification);
  }
}

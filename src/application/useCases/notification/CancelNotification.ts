import { Injectable } from '@nestjs/common';
import { NotificationNotFoundError } from '../errors/NotificationNotFoundError';
import { NotificationRepository } from '../../repositories/NotificationRepository';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );
    if (!notification) throw new NotificationNotFoundError();
    notification.cancel();
    await this.notificationsRepository.save(notification);
  }
}

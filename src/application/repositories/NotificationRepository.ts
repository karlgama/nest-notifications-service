import { Notification } from '../entities/Notification';

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract save(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract countManyByRecipientId(recipientId: string): Promise<number>;
  abstract findManyByRecipientId(recipientId: string): Promise<Notification[]>;
}

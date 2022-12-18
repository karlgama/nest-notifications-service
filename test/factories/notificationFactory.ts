import { Content } from '@application/entities/Content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/Notification';
import { randomUUID } from 'crypto';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}): Notification {
  return new Notification({
    recipientId: randomUUID(),
    content: new Content('notificação'),
    category: 'category',
    ...override,
  });
}

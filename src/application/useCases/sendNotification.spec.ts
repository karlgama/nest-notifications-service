import { Notification } from '../entities/Notification';
import { NotificationRepository } from '../repositories/NotificationRepository';
import { SendNotification } from './SendNotification';

const notifications: Notification[] = [];

const notificationRpo: NotificationRepository = {
  async create(notification: Notification) {
    notifications.push(notification);
  },
};

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification(notificationRpo);

    await sendNotification.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: 'example-recipient',
    });

    expect(notifications).toHaveLength(1);
  });
});

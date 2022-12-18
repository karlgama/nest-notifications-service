import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationRepository';
import { SendNotification } from './SendNotification';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const repo = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(repo);

    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: 'example-recipient',
    });

    expect(repo.notifications).toHaveLength(1);
    expect(repo.notifications[0]).toEqual(notification);
  });
});

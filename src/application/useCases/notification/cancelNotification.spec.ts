import { CancelNotification } from './CancelNotification';
import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationRepository';
import { Notification } from '@application/entities/Notification';
import { NotificationNotFoundError } from './../errors/NotificationNotFoundError';
import { makeNotification } from '@test/factories/notificationFactory';

describe('Cancel notification', () => {
  it('should be able to Cancel a notification', async () => {
    const repo = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(repo);

    const notification = new Notification(makeNotification());

    await repo.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(repo.notifications[0].cancelAt).toEqual(expect.any(Date));
  });
  it('should not be able to cancel a non existing notification', async () => {
    const repo = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(repo);

    await expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake id',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});

import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationRepository';
import { Notification } from '@application/entities/Notification';
import { NotificationNotFoundError } from './../errors/NotificationNotFoundError';
import { UnreadNotification } from './UnreadNotification';
import { makeNotification } from '@test/factories/notificationFactory';

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const repo = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(repo);

    const notification = new Notification(
      makeNotification({
        readAt: new Date(),
      }),
    );

    await repo.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(repo.notifications[0].readAt).toBeNull();
  });
  it('should not be able to unread a non existing notification', async () => {
    const repo = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(repo);

    await expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake id',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});

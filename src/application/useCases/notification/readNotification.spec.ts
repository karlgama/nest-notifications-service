import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationRepository';
import { Notification } from '@application/entities/Notification';
import { NotificationNotFoundError } from './../errors/NotificationNotFoundError';
import { ReadNotification } from './ReadNotification';
import { makeNotification } from '@test/factories/notificationFactory';

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const repo = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(repo);

    const notification = new Notification(makeNotification());

    await repo.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(repo.notifications[0].readAt).toEqual(expect.any(Date));
  });
  it('should not be able to read a non existing notification', async () => {
    const repo = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(repo);

    await expect(() => {
      return readNotification.execute({
        notificationId: 'fake id',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});

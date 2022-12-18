import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationRepository';
import { ListRecipientNotification } from './ListRecipientNotifications';
import { makeNotification } from '@test/factories/notificationFactory';
import { randomUUID } from 'crypto';

describe('List recipients notifications', () => {
  it('should be able to list recipients notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const listRecipientNotifications = new ListRecipientNotification(
      notificationRepository,
    );
    const id = randomUUID();
    await notificationRepository.create(makeNotification({ recipientId: id }));
    await notificationRepository.create(makeNotification({ recipientId: id }));
    await notificationRepository.create(makeNotification());

    const { notifications } = await listRecipientNotifications.execute({
      recipientId: id,
    });

    expect(notifications.length).toEqual(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: id }),
        expect.objectContaining({ recipientId: id }),
      ]),
    );
  });
});

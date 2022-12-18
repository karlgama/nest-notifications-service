import { CountRecipientNotification } from './CountRecipientNotifications';
import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationRepository';
import { makeNotification } from '@test/factories/notificationFactory';
import { randomUUID } from 'crypto';
describe('Count recipients notifications', () => {
  it('should be able to count recipients notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotification(
      notificationRepository,
    );
    const id = randomUUID();
    await notificationRepository.create(makeNotification({ recipientId: id }));
    await notificationRepository.create(makeNotification({ recipientId: id }));
    await notificationRepository.create(makeNotification());

    const { count } = await countRecipientNotifications.execute({
      recipientId: id,
    });

    expect(count).toEqual(2);
  });
});

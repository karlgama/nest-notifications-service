import { Injectable } from '@nestjs/common';
import { Notification } from 'src/application/entities/Notification';
import { NotificationRepository } from 'src/application/repositories/NotificationRepository';
import { PrismaNotificationMapper } from './../mappers/PrismaNotificationMapper';
import { PrismaService } from './../Prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prisma: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (notification)
      return PrismaNotificationMapper.toDomainNotification(notification);

    return null;
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return await this.prisma.notification.count({
      where: {
        id: recipientId,
      },
    });
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrismaNotification(notification);

    await this.prisma.notification.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        recipientId,
      },
    });
    return notifications.map(PrismaNotificationMapper.toDomainNotification);
  }

  async create(notification: Notification): Promise<void> {
    const prismaNotification =
      PrismaNotificationMapper.toPrismaNotification(notification);

    await this.prisma.notification.create({
      data: prismaNotification,
    });
  }
}

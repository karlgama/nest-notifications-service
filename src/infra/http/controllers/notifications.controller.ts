import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CancelNotification } from './../../../application/useCases/notification/CancelNotification';
import { CountRecipientNotification } from '@application/useCases/notification/CountRecipientNotifications';
import { CreateNotificationBody } from '../dtos/request/CreateNotificationBody';
import { ListRecipientNotification } from '@application/useCases/notification/ListRecipientNotifications';
import { NotificationMapper } from '../mappers/NotificationMapper';
import { NotificationResponse } from '../dtos/response/NotificationResponse';
import { ReadNotification } from '@application/useCases/notification/ReadNotification';
import { SendNotification } from '@application/useCases/notification/SendNotification';
import { UnreadNotification } from '@application/useCases/notification/UnreadNotification';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotification: CountRecipientNotification,
    private listRecipientNotification: ListRecipientNotification,
  ) {}

  @Patch(':id/cancel/')
  @HttpCode(204)
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });

    return { count };
  }

  @Get('from/:recipientId')
  async listFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.listRecipientNotification.execute({
      recipientId,
    });
    return {
      notifications: notifications.map(
        NotificationMapper.toNotificationResponse,
      ),
    };
  }

  @Patch('id:/read')
  @HttpCode(204)
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch('id:/unread')
  @HttpCode(204)
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Post()
  async create(
    @Body() body: CreateNotificationBody,
  ): Promise<NotificationResponse> {
    const { recipientId, content, category } = body;
    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });
    return NotificationMapper.toNotificationResponse(notification);
  }
}

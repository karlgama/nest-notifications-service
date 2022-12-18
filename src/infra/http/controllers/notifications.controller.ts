import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/request/CreateNotificationBody';
import { NotificationMapper } from '../mappers/NotificationMapper';
import { NotificationResponse } from '../dtos/response/NotificationResponse';
import { SendNotification } from '@application/useCases/SendNotification';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

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

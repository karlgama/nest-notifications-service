import { CancelNotification } from '@application/useCases/notification/CancelNotification';
import { CountRecipientNotification } from '@application/useCases/notification/CountRecipientNotifications';
import { DatabaseModule } from '../database/Database.module';
import { ListRecipientNotification } from '@application/useCases/notification/ListRecipientNotifications';
import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { ReadNotification } from '@application/useCases/notification/ReadNotification';
import { SendNotification } from '@application/useCases/notification/SendNotification';
import { UnreadNotification } from '@application/useCases/notification/UnreadNotification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    ListRecipientNotification,
    ReadNotification,
    CountRecipientNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}

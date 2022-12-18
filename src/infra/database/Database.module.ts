import { Module } from '@nestjs/common';
import { NotificationRepository } from 'src/application/repositories/NotificationRepository';
import { PrismaNotificationRepository } from './prisma/repositories/PrismaNotificationRepository';
import { PrismaService } from './prisma/Prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class DatabaseModule {}

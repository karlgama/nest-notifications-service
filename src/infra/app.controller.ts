import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNotificationBody } from './CreateNotificationBody';
import { PrismaService } from './prisma.service';

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;
    // return this.prisma.notification.create({
    //   data: {
    //     id: randomUUID(),
    //     content: 'Você tem...',
    //     category: 'social',
    //     recipientId: randomUUID(),
    //   },
    // });
  }
}

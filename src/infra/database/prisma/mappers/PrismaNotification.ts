export interface PrismaNotification {
  id: string;
  category: string;
  content: string;
  recipientId: string;
  readAt: Date | null | undefined;
  createdAt: Date;
}

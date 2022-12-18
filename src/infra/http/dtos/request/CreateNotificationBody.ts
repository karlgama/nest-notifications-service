import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationBody {
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;
  @Length(5, 240)
  content: string;
  category: string;

  constructor(recipientId, content, category) {
    this.category = category;
    this.recipientId = recipientId;
    this.content = content;
  }
}

import { DatabaseModule } from './database/Database.module';
import { HttpModule } from './http/http.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule, DatabaseModule],
})
export class AppModule {}

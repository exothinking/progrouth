import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { SeedingEventModule } from './modules/seeding-event/seeding-event.module';

@Module({
  imports: [ConfigModule.forRoot(), SeedingEventModule],
  controllers: [AppController],
})
export class AppModule {}

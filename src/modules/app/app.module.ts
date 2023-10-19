import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configFactory } from '../../config/config';
import { PrismaService } from '../../prisma/prisma.service';
import { TaskModule } from '../task/task.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configFactory],
    }),
    TaskModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

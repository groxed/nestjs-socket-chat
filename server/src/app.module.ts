import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatModule } from './chat/chat.module';
import { Message } from './utils/models/message.model';
import { Room } from './utils/models/room.model';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [Room, Message],
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    ChatModule,
    RoomsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

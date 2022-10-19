import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from 'src/utils/models/message.model';
import { Room } from 'src/utils/models/room.model';
import { ChatService } from './chat.service';
import { ChatGateway } from './gateways/chat.gateway';

@Module({
  imports: [SequelizeModule.forFeature([Room, Message])],
  controllers: [],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Server } from 'http';
import { Socket } from 'socket.io';
import { Message } from 'src/utils/models/message.model';
import { Room } from 'src/utils/models/room.model';
import { ClientMessage } from 'src/utils/types/clientMessage';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Room)
    private roomModel: typeof Room,
    @InjectModel(Message)
    private messageModel: typeof Message,
  ) {}

  getRoomId(client: Socket): string {
    return client.handshake.query.roomId.toString();
  }

  async joinToRoom(client: Socket): Promise<string> {
    try {
      const roomId = client.handshake.query.roomId.toString();

      const existingRoom = await this.roomModel.findByPk(roomId, {
        include: Message,
      });

      client.join(roomId);

      if (!existingRoom) {
        await this.roomModel.create({ id: roomId });
      } else {
        client.emit('GetPrevMessages', existingRoom.messages);
      }

      return roomId;
    } catch (e) {
      console.error(e);
    }
  }

  async addRoomMessage(
    roomId: string,
    message: ClientMessage,
  ): Promise<Message> {
    try {
      return await this.messageModel.create({
        ...message,
        roomId,
      });
    } catch (e) {
      console.error(e);
    }
  }
}

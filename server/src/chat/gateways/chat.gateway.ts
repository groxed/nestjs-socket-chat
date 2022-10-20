import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ClientMessage } from 'src/utils/types/clientMessage';
import { ChatService } from '../chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleDisconnect(client: Socket) {
    this.updateUsersInRoom(this.chatService.getRoomId(client));
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client ${client.id} connected`);

    this.chatService.joinToRoom(client).then((roomId) => {
      this.updateUsersInRoom(roomId);
    });
  }

  @SubscribeMessage('SendMessage')
  listenForMessages(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: ClientMessage,
  ) {
    this.processMessage(this.chatService.getRoomId(client), message);
  }

  processMessage(roomId: string, message: ClientMessage): void {
    this.chatService.addRoomMessage(roomId, message).then((message) => {
      this.server.to(roomId).emit('ReceiveMessage', message);
    });
  }

  updateUsersInRoom(roomId: string): void {
    this.server
      .in(roomId)
      .fetchSockets()
      .then((usersInRoom) => {
        const usersInRoomInfo = usersInRoom.map((user) => ({
          username: user.handshake.query.username,
          id: user.id,
        }));

        this.server.to(roomId).emit('UsersInRoom', usersInRoomInfo);
      });
  }
}

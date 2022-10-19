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
    const roomId = client.handshake.query.roomId.toString();

    this.updateUsersInRoom(roomId);
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
    const roomId = client.handshake.query.roomId.toString();
    this.server.to(roomId).emit('ReceiveMessage', message);

    this.chatService.addRoomMessage(roomId, message);
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

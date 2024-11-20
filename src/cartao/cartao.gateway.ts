import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class CartaoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
      console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
      console.log(`Client disconnected: ${client.id}`);
  }

  sendUpdate(event: string, data: any) {
      this.server.emit(event, data);
  }
}
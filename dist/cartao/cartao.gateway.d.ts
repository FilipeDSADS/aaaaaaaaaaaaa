import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class CartaoGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    handleConnection(client: any): void;
    handleDisconnect(client: any): void;
    sendUpdate(event: string, data: any): void;
}
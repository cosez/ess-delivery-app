import { StatusService } from './status.service';
import { WebSocketGateway, MessageBody, WebSocketServer, WsResponse, SubscribeMessage, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, } from '@nestjs/websockets';
import { Socket } from 'net';


@WebSocketGateway(8080)
export class StatusGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private client_socket : Socket;

    constructor(private statusService: StatusService) {}

    handleConnection(client: any, ...args: any[]) {
        this.client_socket = client;
        this.client_socket.emit('ready', () => "Ready to provide service");
    }

    handleDisconnect(client: any) {
        this.client_socket.emit('close', () => "Connection closing...");
        this.client_socket.end; // SEND FIN TO THE CLIENT, expect client to disconnect first
    }

    OnGatewayConnection<T = any>(client: T) {
        this.handleConnection(client);
        return 'READY';
    }

    OnGatewayDisconnect<T=any>(client: T) {
        this.handleDisconnect(client);
    }

    @SubscribeMessage('status/advance')
    advanceStatus(): any{ //CHANGE TO datatype order, all of these
        this.client_socket.emit('status/advance', this.statusService.advanceStatus());
    }

    @SubscribeMessage('status/regress')
    regressStatus(): any{
        this.client_socket.emit('status/regress', () => this.statusService.regressStatus());
    }

    @SubscribeMessage('status/reset')
    resetStatus(): any{
        this.client_socket.emit('status/reset', () => this.statusService.resetStatus());
    }

    @SubscribeMessage('status/actual')
    actualStatus(): any{
        this.client_socket.emit('status/actual',() => this.statusService.actualStatus());
    }

}

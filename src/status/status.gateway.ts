import { StatusService } from './status.service';
import { WebSocketGateway, MessageBody, WebSocketServer, WsResponse, SubscribeMessage, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, } from '@nestjs/websockets';
import { Server, Socket  } from 'socket.io';
import { Order } from './status.interface';

@WebSocketGateway({cors: {
    origin: '*',
}})
export class StatusGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private __socket: Socket;
    constructor(private statusService: StatusService) {}

     handleConnection(client: any, ...args: any[]) {
         this.__socket = client;
    }

     handleDisconnect(client: any) {
    }

    // advanceStatus(): any{ //CHANGE TO datatype order, all of these
    @SubscribeMessage('advance')
    handleUpdateEvent(@MessageBody() order: Order, @ConnectedSocket() client: Socket): Order {
        return this.statusService.promoteStatus(order);
    }

    @SubscribeMessage('regress')
    handleRejectEvent(@MessageBody() order: Order, @ConnectedSocket() client: Socket): Order{
        return this.statusService.demoteStatus(order);
    }

    @SubscribeMessage('reset')
    handleResetEvent(@MessageBody() order: Order, @ConnectedSocket() client: Socket): Order{
        return this.statusService.resetStatus(order);
    }
    @SubscribeMessage('actual')
    handleActualEvent(@MessageBody() order: Order, @ConnectedSocket() client: Socket): Order{
        return this.statusService.actualStatus(order);
    }

}

import { StatusService } from './status.service';
import { WebSocketGateway, MessageBody, WebSocketServer, WsResponse, SubscribeMessage, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, } from '@nestjs/websockets';
import { Socket  } from 'socket.io-client';
import { Order } from './status.interface';

@WebSocketGateway({cors: {
    origin: '*'
}})
export class StatusGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private __socket: string[] = [];
    private __testData: Order;
    constructor(private statusService: StatusService) {}

     handleConnection(client: Socket, ...args: any[]) {
         this.__socket.push(client.id);
    }

     handleDisconnect(client: Socket) {
         this.__socket.pop();
    }

    //MAKE SURE CLIENT IS THE __SOCKET[0]
    @SubscribeMessage('forward-server')
    handleForwardEvent(@MessageBody() order: Order, @ConnectedSocket() client: Socket) {
        client.id = this.__socket[0];
        this.__testData = order;
    }

    @SubscribeMessage('advance-test')
    handleUpdate2Event(@MessageBody() order: Order, @ConnectedSocket() client: Socket) {
        client.id = this.__socket[0];
        setTimeout(() => {
            client.timeout(50000).emit('dispatch' ,this.statusService.promoteStatus(this.__testData));
        }, 15000)
        setTimeout(() => {
            client.timeout(50000).emit('dispatch' ,this.statusService.promoteStatus(this.__testData));
        }, 30000)
        setTimeout(() => {
            client.timeout(50000).emit('dispatch' ,this.statusService.promoteStatus(this.__testData));
        }, 45000)
        setTimeout(() => {
            client.timeout(50000).emit('dispatch' ,this.statusService.promoteStatus(this.__testData));
        }, 60000)
        setTimeout(() => {
            client.timeout(50000).emit('dispatch' ,this.statusService.promoteStatus(this.__testData));
        }, 75000)
    }

    @SubscribeMessage('advance')
    handleUpdateEvent(@MessageBody() order: Order, @ConnectedSocket() client: Socket) {
        client.id = this.__socket[0];
        client.emit('dispatch' ,this.statusService.promoteStatus(order));
    }

    @SubscribeMessage('regress')
    handleRejectEvent(@MessageBody() order: Order, @ConnectedSocket() client: Socket){
        client.id = this.__socket[0];
        client.emit('dispatch', this.statusService.demoteStatus(order));
    }

    @SubscribeMessage('reset')
    handleResetEvent(@MessageBody() order: Order, @ConnectedSocket() client: Socket){
        client.id = this.__socket[0];
        client.emit('dispatch', this.statusService.resetStatus(order));
    }

    @SubscribeMessage('actual')
    handleActualEvent(@MessageBody() order: Order, @ConnectedSocket() client: Socket) {
        client.id = this.__socket[0];
        client.emit('dispatch', this.statusService.actualStatus(order));
    }

    }

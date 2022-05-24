import { Injectable } from '@nestjs/common';
import { Order } from './status.interface';

@Injectable()
export class StatusService {

    promoteStatus(order: Order): Order{
        order.status < 4?order.status++:order.status;
        return order;
    }

    demoteStatus(order: Order): Order{
        order.status == 0?order.status:order.status--;
        return order;
    }

    resetStatus(order: Order): Order{
        order.status=1;
        return order;
    }

    actualStatus(order: Order): Order{
        return order;
    }

}

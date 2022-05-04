import {Pedido} from './pedido';

export class Status implements Pedido {
    public static statusList: Status[] = [];
    cpf: string; // Suppose that order has being unpacked in cpf, cnpj and id
    cnpj: string;
    id: number;
    state: number = 0;

    constructor() {
        this.cpf = "";
        this.cnpj ="";
        this.id = -1;
        this.state = 0; //validation is implicit
    }

    clone(order: Status){
        this.cpf = <string> order.cpf;
        this.cnpj = <string> order.cnpj;
        this.id = <number> order.id;
        this.state= <number> order.state;
    }
    pushStatus(): void{
        Status.statusList.push(Object.assign({},this));
    }
    }

}

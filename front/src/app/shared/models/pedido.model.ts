import { ItemPedido } from './itemPedido';
import { Cliente } from './cliente.model';
export class Pedido {
    constructor(
        public id: number = 0,
        public data: string = '',
        public cliente?: Cliente,
        public itensPedido?: ItemPedido[]
    ) {}
}
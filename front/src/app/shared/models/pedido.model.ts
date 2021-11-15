import { Produto } from './produto.model';
export class Pedido {
    constructor(
        public id: number = 0,
        public data: string = '', 
        public produto: Produto,
        // public cliente: Cliente
    ) {}
}
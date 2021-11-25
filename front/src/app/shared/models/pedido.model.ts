import { ItemPedido } from './itemPedido';
import { Cliente } from './cliente.model';
export class Pedido {
    constructor(
        public id: number = 0,
        public data: string = '',
        public cliente?: Cliente,
        public itensPedido?: ItemPedido[]
    ) {}

    public getInfoCliente(cliente?: Cliente): String {
        return cliente?.cpf + ' - ' + cliente?.nome + ' ' + cliente?.sobrenome;
    }

    public getInfoItemPedido(item?: ItemPedido): String {
        return 'Item: ' + item?.item?.descricao + ' / Quantidade: ' + item?.quantidade; 
    }
}
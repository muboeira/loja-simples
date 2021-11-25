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

    public getInfoItemPedido(item?: ItemPedido): string {
        return 'Item: ' + item?.item?.descricao + ' / Quantidade: ' + item?.quantidade; 
    }
    
    public getInfoItem(item?: ItemPedido): String {
        return 'Item: ' + item?.item?.descricao ; 
    }

    public getInfoItensPedido(itens?: ItemPedido[]): string {
        var infoItens: string = '';
        itens?.forEach(item => {
            infoItens += 'Item: ' + item?.item?.descricao + ' / Quantidade: ' + item?.quantidade + '<br>'; 
        });

        return infoItens;
    }

}
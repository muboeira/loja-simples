import { Produto } from 'src/app/shared/models/produto.model';
export class ItemPedido {
    constructor(
      public quantidade: number = 0,
      public item?: Produto
    ) {}
  }
  
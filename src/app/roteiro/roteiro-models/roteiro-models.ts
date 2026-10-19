export interface RoteiroInterface {
    id?: string;
    cliente: string;
    cidade: string;
    bairro: string;
    observacao: string;
    cartao?: number;
    loja_polimedica: string;
    pedido_nf: string;
    dinheiro_cheque?: number;
    troco?: number;
    vendedor?: string;
    responsavel?: string;
    data?: Date | string;
    entregue?: string;
}
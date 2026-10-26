export interface RoteiroInterface {
    id?: string;
    cliente: string;
    cidade: string;
    bairro: string;
    observacao: string;
    cartao?: number;
    lojaPolimedica: string;
    pedidoNf: string;
    dinheiroCheque?: number;
    troco?: number;
    vendedor?: string;
    responsavel?: string;
    data?: Date | string;
    entregue?: string;
    periodo: string;
}
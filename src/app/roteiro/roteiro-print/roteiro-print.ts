import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-roteiro-print',
  styleUrl: './roteiro-print.scss',
  templateUrl: './roteiro-print.html',
})
export class RoteiroPrint {
  data = new Date().toLocaleDateString('pt-BR');
  
  cliente = {
    nome: 'Maria Anders',
    cidade: 'Aparecida',
    bairro: 'Ponte Alta',
    observacao: 'Entregar e Receber',
    cartao: '',
    lojaPolimedica: 'Loja',
    pedidoNF: 'Orç; 23879',
    valor: '23,00',
    troco: '7,00',
    vendedor: 'Quem vendeu',
    responsavel: 'Quem colocou no roteiro'
  };

  
}

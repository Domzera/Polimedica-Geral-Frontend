import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-roteiro-home',
  styleUrl: './roteiro-home.scss',
  templateUrl: './roteiro-home.html',
})
export class RoteiroHome {
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

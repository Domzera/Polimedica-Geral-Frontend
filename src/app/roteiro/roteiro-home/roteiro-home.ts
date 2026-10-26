import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoteiroHomeService } from './roteiro-home-service';
import { RoteiroInterface } from '../roteiro-models/roteiro-models';
import { CommonModule, DatePipe } from '@angular/common';
import { ApiInterface } from '../roteiro-models/api-model';

@Component({
  imports: [RouterLink, CommonModule, DatePipe],
  selector: 'app-roteiro-home',
  styleUrl: './roteiro-home.scss',
  templateUrl: './roteiro-home.html',
})
export class RoteiroHome {
  listaDeRoteiros: RoteiroInterface[] = [];
  listaApiRoteiro: ApiInterface[] =[];
  dataSelecionada: Date = new Date();

  constructor(
    private _roteiroHomeService: RoteiroHomeService
  ) { }

  ngOnInit() {
    const data = this.dataSelecionada ? new Date(this.dataSelecionada) : new Date();

    this._roteiroHomeService.getRoteiro(data).subscribe({
      next: (result: any) => {
        const dadosRoteiro = result.value;

        if(dadosRoteiro && Array.isArray(dadosRoteiro) && dadosRoteiro.length > 0){

          this.listaDeRoteiros = dadosRoteiro.map((roteiro: ApiInterface) => {
            return {
              cliente: roteiro.cliente,
              cidade: roteiro.cidade,
              bairro: roteiro.bairro,
              observacao: roteiro.observacao,
              cartao: roteiro.cartao || 0,
              lojaPolimedica: roteiro.lojaPolimedica,
              pedidoNf: roteiro.pedidoNf,
              dinheiroCheque: roteiro.dinheiroCheque || 0,
              troco: roteiro.troco || 0,
              vendedor: roteiro.vendedor,
              responsavel: roteiro.responsavel,
              periodo: roteiro.periodo
            };
          }).sort((a,b) => {
            return a.periodo.localeCompare(b.periodo);
          });

          console.log("Lista de roteiros: => ", this.listaDeRoteiros);
        }
      },
      error: (err) => {
        console.log('Erro => ', err);
      }
    })
  }

}

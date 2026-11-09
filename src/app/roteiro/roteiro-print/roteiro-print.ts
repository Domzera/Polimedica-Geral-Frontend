import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button-component/button-component';
import { CurrencyPipe } from '@angular/common';
import { ApiInterface } from '../roteiro-models/api-model';

@Component({
  imports: [ButtonComponent,CurrencyPipe ],
  selector: 'app-roteiro-print',
  styleUrl: './roteiro-print.scss',
  templateUrl: './roteiro-print.html',
})
export class RoteiroPrint {
  roteiros: ApiInterface[]=[];
  periodo: string ='';
  entregas:ApiInterface[]=[];

   imprimir(): void {
    window.print(); // Abre a tela de impressão do navegador
  }

  constructor(private router: Router){
    const navegacao = this.router.currentNavigation();
    const dados = navegacao?.extras.state;

    if(dados){
      this.roteiros = dados['roteiros'].sort((a: ApiInterface, b: ApiInterface) => a.cidade.localeCompare(b.cidade) || a.bairro.localeCompare(b.bairro));
      this.periodo = dados['periodo'];
    }
  }
}

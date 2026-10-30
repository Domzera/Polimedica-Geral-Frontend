import { Component } from '@angular/core';
import { RoteiroInterface } from '../roteiro-models/roteiro-models'
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button-component/button-component';

@Component({
  imports: [ButtonComponent],
  selector: 'app-roteiro-print',
  styleUrl: './roteiro-print.scss',
  templateUrl: './roteiro-print.html',
})
export class RoteiroPrint {
  roteiros: RoteiroInterface[]=[];
  periodo: string ='';
  entregas:RoteiroInterface[]=[];

   imprimir(): void {
    window.print(); // Abre a tela de impressão do navegador
  }

  constructor(private router: Router){
    const navegacao = this.router.currentNavigation();
    const dados = navegacao?.extras.state;

    if(dados){
      this.roteiros = dados['roteiros'];
      this.periodo = dados['periodo'];
    }
    console.log("Componente imprimir periodo: ",this.periodo);
    console.log("Componente imprimir roteiro: ",this.roteiros);
    this.roteiros.forEach((roteiro)=>{
      console.log(`Periodo: ${roteiro.periodo}`);
    });
  }
}

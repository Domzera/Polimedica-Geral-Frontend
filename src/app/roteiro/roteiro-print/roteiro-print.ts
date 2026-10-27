import { Component } from '@angular/core';
import { TabelaPrintComponent } from '../roteiroComponents/tabela-print-component/tabela-print-component';

@Component({
  imports: [TabelaPrintComponent],
  selector: 'app-roteiro-print',
  styleUrl: './roteiro-print.scss',
  templateUrl: './roteiro-print.html',
})
export class RoteiroPrint {
  data = new Date().toLocaleDateString('pt-BR');

  
}

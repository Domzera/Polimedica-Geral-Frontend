import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-roteiro-print',
  styleUrl: './roteiro-print.scss',
  templateUrl: './roteiro-print.html',
})
export class RoteiroPrint {
  data = new Date().toLocaleDateString('pt-BR');
  periodo = '';

  
}

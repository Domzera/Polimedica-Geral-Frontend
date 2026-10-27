import { Component, Input } from '@angular/core';
import { RoteiroInterface } from '../../roteiro-models/roteiro-models';

@Component({
  imports: [],
  selector: 'app-tabela-print-component',
  styleUrl: './tabela-print-component.scss',
  templateUrl: './tabela-print-component.html',
})
export class TabelaPrintComponent {
  @Input() roteiros: RoteiroInterface[] = [];
}

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

  @Input() intext: string = '';
  @Input() dadosRoteiro: any; 

  ngOnInit(): void {
    // 2. Exibe no console assim que o componente iniciar
    console.log('Texto do botão:', this.intext);
    console.log('Dados do roteiro recebidos:', this.dadosRoteiro);
  }
}

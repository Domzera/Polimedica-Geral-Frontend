import { Component, Input } from '@angular/core';
import { DadosButtonmodel } from '../../roteiro/roteiro-models/dados-buttonmodel';

@Component({
  imports: [],
  selector: 'app-button-component',
  styleUrl: './button-component.scss',
  templateUrl: './button-component.html',
})
export class ButtonComponent {
@Input() intext: string = '';
@Input() Dados?: DadosButtonmodel;
}

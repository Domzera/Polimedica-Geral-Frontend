import { Component, Input } from '@angular/core';
import { RoteiroInterface } from '../../roteiro/roteiro-models/roteiro-models';

@Component({
  imports: [],
  selector: 'app-button-component',
  styleUrl: './button-component.scss',
  templateUrl: './button-component.html',
})
export class ButtonComponent {
@Input() intext: string = '';
@Input() roteiros: RoteiroInterface[] = [];
@Input() periodo: string = '';
}

import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../../components/button-component/button-component';
import { RoteiroInterface } from '../../roteiro-models/roteiro-models';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink, ButtonComponent],
  selector: 'app-tabela-component',
  styleUrl: './tabela-component.scss',
  templateUrl: './tabela-component.html',
})
export class TabelaComponent {
  @Input() roteiros: RoteiroInterface[] = [];
}

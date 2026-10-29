import { Component, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../../components/button-component/button-component';
import { RoteiroInterface } from '../../roteiro-models/roteiro-models';
import { RouterLink } from '@angular/router';
import { DadosButtonmodel } from '../../roteiro-models/dados-buttonmodel';

@Component({
  imports: [RouterLink, ButtonComponent],
  selector: 'app-tabela-component',
  styleUrl: './tabela-component.scss',
  templateUrl: './tabela-component.html',
})
export class TabelaComponent {
  entregas1: RoteiroInterface[] = [];
  entregas2: RoteiroInterface[] = [];
  entregas3: RoteiroInterface[] = [];
  entregas4: RoteiroInterface[] = [];
  entregas5: RoteiroInterface[] = [];

  flag: number = 0;

  @Input() roteiros: RoteiroInterface[] = [];
  @Output() dados: DadosButtonmodel = { data: '', periodo: '' };


}

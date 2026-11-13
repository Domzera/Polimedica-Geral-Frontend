import { Component, Input } from '@angular/core';
import { ApiInterface } from '../../roteiro-models/api-model';
import { DatePipe } from '@angular/common';

@Component({
  imports: [DatePipe],
  selector: 'app-tabela-pesquisa',
  styleUrl: './tabela-pesquisa.scss',
  templateUrl: './tabela-pesquisa.html',
})
export class TabelaPesquisa {
  @Input() pesquisa: ApiInterface[] = [];
}

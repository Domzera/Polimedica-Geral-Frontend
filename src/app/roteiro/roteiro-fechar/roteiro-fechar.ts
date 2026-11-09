import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiInterface } from '../roteiro-models/api-model';
import { ButtonComponent } from '../../components/button-component/button-component';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoteiroService } from '../roteiro-service/service';

@Component({
  imports: [ButtonComponent, CurrencyPipe, FormsModule],
  selector: 'app-roteiro-fechar',
  styleUrl: './roteiro-fechar.scss',
  templateUrl: './roteiro-fechar.html',
})
export class RoteiroFechar {
  roteiros: ApiInterface[] = [];
  periodo: string = '';
  entregas: ApiInterface[] = [];

  constructor(
    private router: Router,
    private roteiroService: RoteiroService) {
    const navegacao = this.router.currentNavigation();
    const dados = navegacao?.extras.state;

    if (dados) {
      this.roteiros = dados['roteiros'].sort((a: ApiInterface, b: ApiInterface) => a.cidade.localeCompare(b.cidade) || a.bairro.localeCompare(b.bairro));
      this.periodo = dados['periodo'];
      console.log('Roteiros recebidos:', this.roteiros);
    }
  }

  Entregar(_roteiro: ApiInterface) {

    _roteiro.entregue = true;
    this.roteiroService.updateRoteiro(_roteiro.id, _roteiro).subscribe({
      next: () => {
        alert(`Roteiro com ID ${_roteiro.cliente} atualizado com sucesso.`);
        console.log(`Roteiro com ID ${_roteiro.id} atualizado com sucesso.`);
      },
      error: (err) => {
        alert(`Erro ao atualizar o roteiro com ID ${_roteiro.cliente}.`);
        console.error(`Erro ao atualizar o roteiro com ID ${_roteiro.id}:`, err);
      }
    });
  }
}

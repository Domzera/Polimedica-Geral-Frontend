import { ChangeDetectorRef, Component } from '@angular/core';
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
  dinheiro: number = 0;
  troco: number = 0;
  cartao: number = 0;
  total: number = 0;
  dinheiroLoja: number = 0;
  trocoLoja: number = 0;
  cartaoLoja: number = 0;
  totalLoja: number = 0;
  dinheiroPoli: number = 0;
  trocoPoli: number = 0;
  cartaoPoli: number = 0;
  totalPoli: number = 0;
  roteiros: ApiInterface[] = [];
  periodo: string = '';
  entregas: ApiInterface[] = [];

  constructor(
    private router: Router,
    private _cdr: ChangeDetectorRef,

    private roteiroService: RoteiroService) {
    const navegacao = this.router.currentNavigation();
    const dados = navegacao?.extras.state as { roteiros: ApiInterface[]; periodo: string };

    if (dados) {
      this.roteiros = dados['roteiros'].sort((a: ApiInterface, b: ApiInterface) => a.cidade.localeCompare(b.cidade) || a.bairro.localeCompare(b.bairro));
      this.periodo = dados['periodo'];
      
      this.roteiros.forEach((item: ApiInterface) =>{
        if(item.periodo == this.periodo){
          this.dinheiro += item.dinheiroCheque!;
          this.troco += item.troco!;
          this.cartao += item.cartao!;
        }
        this.total = this.dinheiro + this.troco
        if(item.lojaPolimedica == "Polimédica"){
          if(item.periodo == this.periodo){
          this.dinheiroPoli += item.dinheiroCheque!;
          this.trocoPoli += item.troco!;
          this.cartaoPoli += item.cartao!;
        }}
        this.totalPoli = this.dinheiroPoli + this.trocoPoli;        
        if(item.lojaPolimedica == "Loja"){
          if(item.periodo == this.periodo){
          this.dinheiroLoja += item.dinheiroCheque!;
          this.trocoLoja += item.troco!;
          this.cartaoLoja += item.cartao!;
        }}
        this.totalLoja = this.dinheiroLoja + this.trocoLoja;
      })
    }
  }

  Entregar(_roteiro: ApiInterface) {

    _roteiro.entregue = true;
    this.roteiroService.updateRoteiro(_roteiro.id, _roteiro).subscribe({
      next: () => {
        // alert(`Roteiro com ID ${_roteiro.cliente} atualizado com sucesso.`);
        console.log(`Roteiro com ID ${_roteiro.id} atualizado com sucesso.`);
      },
      error: (err) => {
        alert(`Erro ao atualizar o roteiro com ID ${_roteiro.cliente}.`);
        console.error(`Erro ao atualizar o roteiro com ID ${_roteiro.id}:`, err);
      }
    });
    this._cdr.detectChanges;
  }
}
function total() {
  throw new Error('Function not implemented.');
}


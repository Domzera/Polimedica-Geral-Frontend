import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { RoteiroInterface } from '../roteiro-models/roteiro-models';
import { ApiInterface } from '../roteiro-models/api-model';
import { RoteiroService } from '../roteiro-service/service';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../components/button-component/button-component';
import { TabelaComponent } from '../roteiroComponents/tabela-component/tabela-component';

@Component({
  imports: [RouterLink, CommonModule, ReactiveFormsModule, ButtonComponent,TabelaComponent],
  standalone: true, // Garanta que esteja como standalone caso use a sintaxe moderna de imports
  selector: 'app-roteiro-home',
  styleUrl: './roteiro-home.scss',
  templateUrl: './roteiro-home.html',
})
export class RoteiroHome implements OnInit {
  listaDeRoteiros: RoteiroInterface[] = [];
  listaApiRoteiro: ApiInterface[] = [];
  
  // Instanciamos o FormGroup
  data = new FormGroup({
    dataSelecionada: new FormControl<string | null>(null) // Input date nativo usa string (YYYY-MM-DD)
  });

  today: Date = new Date();

  constructor(
    private _service: RoteiroService,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // 1. Carrega os dados iniciais com a data de hoje
    this.buscarRoteiros(this.today);

    // 2. Escuta quando o usuário muda a data no input
    this.data.get('dataSelecionada')?.valueChanges.subscribe((valorString) => {
      if (valorString) {
        // Se tiver data enviada, converte a string 'YYYY-MM-DD' para objeto Date
        // Adicionamos o 'T00:00:00' para evitar problemas de fuso horário local
        this.today = new Date(`${valorString}T00:00:00`);
      } else {
        // Se não tiver data (limpou o campo), usa a data de hoje
        this.today = new Date();
      }
      
      // Busca novamente os roteiros com a nova data atualizada
      this.buscarRoteiros(this.today);
    });
  }

  // Isolamos a lógica de busca em um método para reutilizar no OnInit e no valueChanges
  buscarRoteiros(dataParaBusca: Date) {
    this._service.getRoteiro(dataParaBusca).subscribe({
      next: (result: any) => {
        console.log("Data para buscar => " + formatDate(dataParaBusca, 'dd/MM/yyyy', 'en-US'));

        const dadosRoteiro = result.value;

        if (dadosRoteiro && Array.isArray(dadosRoteiro)) {
          this.listaDeRoteiros = dadosRoteiro.map((roteiro: ApiInterface) => {
            return {
              cliente: roteiro.cliente,
              cidade: roteiro.cidade,
              bairro: roteiro.bairro,
              observacao: roteiro.observacao,
              cartao: roteiro.cartao || 0,
              lojaPolimedica: roteiro.lojaPolimedica,
              pedidoNf: roteiro.pedidoNf,
              dinheiroCheque: roteiro.dinheiroCheque || 0,
              troco: roteiro.troco || 0,
              vendedor: roteiro.vendedor,
              responsavel: roteiro.responsavel,
              periodo: roteiro.periodo
            };
          }).sort((a, b) => a.periodo.localeCompare(b.periodo));

          console.log("Quantidade de clientes: => ", this.listaDeRoteiros.length);
          this._cdr.detectChanges();
        } else {
          this.listaDeRoteiros = []; // Limpa a lista caso não retorne dados
          this._cdr.detectChanges();
        }
      },
      error: (err) => {
        console.log('Erro => ', err);
      }
    });
  }
}

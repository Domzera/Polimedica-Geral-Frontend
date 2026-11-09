import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiInterface } from '../roteiro-models/api-model';
import { RoteiroService } from '../roteiro-service/service';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../components/button-component/button-component';
import { TabelaComponent } from '../roteiroComponents/tabela-component/tabela-component';

@Component({
  imports: [RouterLink, CommonModule, ReactiveFormsModule, ButtonComponent, TabelaComponent],
  standalone: true,
  selector: 'app-roteiro-home',
  styleUrl: './roteiro-home.scss',
  templateUrl: './roteiro-home.html',
})
export class RoteiroHome implements OnInit {
  listaApiRoteiro: ApiInterface[] = [];
  //Separação de periodos de entrega
  entregas1: ApiInterface[]=[];
  entregas2: ApiInterface[]=[];
  entregas3: ApiInterface[]=[];
  entregas4: ApiInterface[]=[];
  entregas5: ApiInterface[]=[];

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
      const objetoDate = new Date(`${valorString}T00:00:00`);
      this.buscarRoteiros(objetoDate);
      this.today = objetoDate;;
    });
  }

  // Isolamos a lógica de busca em um método para reutilizar no OnInit e no valueChanges
  buscarRoteiros(dataParaBusca: Date) {
    this._service.getRoteiro(dataParaBusca).subscribe({
      next: (result: any) => {

        const dadosRoteiro = result.value;

        if (dadosRoteiro && Array.isArray(dadosRoteiro)) {
          this.listaApiRoteiro = dadosRoteiro.map((roteiro: ApiInterface) => {
            return {
              id: roteiro.id,
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
              periodo: roteiro.periodo,
              data: roteiro.data,
              entregue: roteiro.entregue || false // Define como '0' se não estiver presente
            };
          }).sort((a, b) => a.periodo.localeCompare(b.periodo));

          //console.log("Lenth => " + this.listaDeRoteiros.length);
          console.log("Roteiros => ", this.listaApiRoteiro);
          this.listaApiRoteiro.forEach((roteiro) => {
            switch(roteiro.periodo){
              case '1':
                this.entregas1.push(roteiro);
                break;
              case '2':
                this.entregas2.push(roteiro);
                break;
              case '3':
                this.entregas3.push(roteiro);
                break;
              case '4':
                this.entregas4.push(roteiro);
                break;
              case '5':
                this.entregas5.push(roteiro);
                break;
              }
          });

          this._cdr.detectChanges();
        } else {
          this.listaApiRoteiro = []; // Limpa a lista caso não retorne dados
          this._cdr.detectChanges();
        }
      },
      error: (err) => {
        console.log('Erro => ', err);
        window.confirm('O Erro foi: ' + err);
      }
    });
  }
}

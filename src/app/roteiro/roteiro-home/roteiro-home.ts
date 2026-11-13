import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiInterface } from '../roteiro-models/api-model';
import { RoteiroService } from '../roteiro-service/service';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../components/button-component/button-component';
import { TabelaComponent } from '../roteiroComponents/tabela-component/tabela-component';
import { TabelaPesquisa } from '../roteiroComponents/tabela-pesquisa/tabela-pesquisa';

@Component({
  imports: [RouterLink, CommonModule, ReactiveFormsModule, ButtonComponent, TabelaComponent, FormsModule,TabelaPesquisa],
  standalone: true,
  selector: 'app-roteiro-home',
  styleUrl: './roteiro-home.scss',
  templateUrl: './roteiro-home.html',
})
export class RoteiroHome implements OnInit {
  listaApiRoteiro: ApiInterface[] = [];
  listaPesquisa: ApiInterface[] = [];
  //Separação de periodos de entrega
  entregas1: ApiInterface[] = [];
  entregas2: ApiInterface[] = [];
  entregas3: ApiInterface[] = [];
  entregas4: ApiInterface[] = [];
  entregas5: ApiInterface[] = [];
  quantidades: number[] = [];
  pesquisaNome: string = '';
  pesquisaPedido: string = '';

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
        this.listaPesquisa = [];
        
        const dadosRoteiro = result.value;
        this.entregas1 = [];
        this.entregas2 = [];
        this.entregas3 = [];
        this.entregas4 = [];
        this.entregas5 = [];

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
            switch (roteiro.periodo) {
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
          this.quantidades[0] = this.entregas1.length;
          this.quantidades[1] = this.entregas2.length;
          this.quantidades[2] = this.entregas3.length;
          this.quantidades[3] = this.entregas4.length;
          this.quantidades[4] = this.entregas5.length;
            
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

  pesquisar(): void {
    const nome = this.pesquisaNome?.trim();
    const pedido = this.pesquisaPedido?.trim();

    if (nome) {
      console.log('Pesquisa por nome de cliente: ', { nome });

      this._service.getCliente(nome).subscribe({
        next: (result: any) => {

          const nomes = Array.isArray(result?.value) ? result.value : [];

          console.log('Lista pesquisa bruta ', nomes);
          if (nomes.length > 0 && Array.isArray(nomes)) {
            this.listaApiRoteiro = [];
            this.listaPesquisa = nomes.map((dadosNomes: ApiInterface) => {
              return{id: dadosNomes.id,
              cliente: dadosNomes.cliente,
              cidade: dadosNomes.cidade,
              bairro: dadosNomes.bairro,
              observacao: dadosNomes.observacao,
              cartao: dadosNomes.cartao || 0,
              lojaPolimedica: dadosNomes.lojaPolimedica,
              pedidoNf: dadosNomes.pedidoNf,
              dinheiroCheque: dadosNomes.dinheiroCheque || 0,
              troco: dadosNomes.troco || 0,
              vendedor: dadosNomes.vendedor,
              responsavel: dadosNomes.responsavel,
              periodo:dadosNomes.periodo == '1' ? "Entregas antes das 10:00h":
                dadosNomes.periodo == '2' ? "Entregas depois das 10:30h":
                dadosNomes.periodo == '3' ? "Entregas depois das 13:30h":
                dadosNomes.periodo == '4' ? "Entregas finais": "Entregas EXTRAS",
              data: dadosNomes.data,
              entregue: dadosNomes.entregue || false // Define como '0' se não estiver presente}
              };
            }).sort((a, b) => String(b.data || '').localeCompare(String(a.data || '')))

            this._cdr.detectChanges();
            this.pesquisaNome = "";
            console.log("Roteiros => ", this.listaPesquisa);
            
          }else{
            this.listaPesquisa = [];
            this._cdr.detectChanges();
            window.alert(`Cliente ${nome} não encontrado`)
            this.pesquisaNome="";
          }
            this._cdr.detectChanges();
          },
          error: (err) => {
            console.error('Erro na requisição getCliente:', err);
            this.listaPesquisa = [];
            this._cdr.detectChanges();
          }
      });
    } else if (pedido) {
      console.log('Pesquisa por numero de Pedido/Orçamento: ', { pedido });

      this._service.getPedido(pedido).subscribe({
        next: (result: any) => {

          const pedidos = Array.isArray(result?.value) ? result.value : [];

          console.log('Lista pesquisa bruta ', pedidos);
          if (pedidos.length > 0 && Array.isArray(pedidos)) {
            this.listaApiRoteiro = [];
            this.listaPesquisa = pedidos.map((dadosPedido: ApiInterface) => {
              return{id: dadosPedido.id,
              cliente: dadosPedido.cliente,
              cidade: dadosPedido.cidade,
              bairro: dadosPedido.bairro,
              observacao: dadosPedido.observacao,
              cartao: dadosPedido.cartao || 0,
              lojaPolimedica: dadosPedido.lojaPolimedica,
              pedidoNf: dadosPedido.pedidoNf,
              dinheiroCheque: dadosPedido.dinheiroCheque || 0,
              troco: dadosPedido.troco || 0,
              vendedor: dadosPedido.vendedor,
              responsavel: dadosPedido.responsavel,
              periodo:dadosPedido.periodo == '1' ? "Entregas antes das 10:00h":
                dadosPedido.periodo == '2' ? "Entregas depois das 10:30h":
                dadosPedido.periodo == '3' ? "Entregas depois das 13:30h":
                dadosPedido.periodo == '4' ? "Entregas finais": "Entregas EXTRAS",
              data: dadosPedido.data,
              entregue: dadosPedido.entregue || false // Define como '0' se não estiver presente}
              };
            }).sort((a, b) => String(b.data || '').localeCompare(String(a.data || '')))

            this._cdr.detectChanges();
            this.pesquisaPedido = "";
            console.log("Roteiros => ", this.listaPesquisa);
            
          }else{
            this.listaPesquisa = [];
            this._cdr.detectChanges();
            window.alert(`Pedido/Orçamento ${pedido} não encontrado`)
            this.pesquisaNome="";
          }
            this._cdr.detectChanges();
          },
          error: (err) => {
            console.error('Erro na requisição getCliente:', err);
            this.listaPesquisa = [];
            this._cdr.detectChanges();
          }
      });
      this.pesquisaPedido = "";
    } else {
      console.log('Nenhum campo foi preenchido.');
      // Lógica caso o usuário clique sem digitar nada (ex: listar todos ou exibir aviso)
      this.pesquisaPedido = "";
      this.pesquisaNome = "";
    }
  }
}

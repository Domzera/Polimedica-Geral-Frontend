import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ButtonComponent } from '../../../components/button-component/button-component';
import { RouterLink } from '@angular/router';
import { RoteiroService } from '../../roteiro-service/service';
import { CurrencyPipe } from '@angular/common';
import { ApiInterface } from '../../roteiro-models/api-model';

@Component({
  imports: [RouterLink, ButtonComponent, CurrencyPipe],
  selector: 'app-tabela-component',
  styleUrl: './tabela-component.scss',
  templateUrl: './tabela-component.html',
})
export class TabelaComponent {
  @Input() roteiros: ApiInterface[]=[];
  id!:number;

   constructor(
    private roteiroService: RoteiroService,
    private _cdr: ChangeDetectorRef
  ){  }

  dispararClique() {
    this.confirmaDelete(this.id);
    this._cdr.detectChanges();
  }

  confirmaDelete(idD:number) {
    this.id = idD;
    console.log("Id Delete => " + this.id);
    const aceitou = window.confirm('Deseja realmente excluir este item?' + this.id);

    if (aceitou) {
      this.roteiroService.deleteRoteiro(this.id).subscribe({
        next: (result) => {
          if(result === 1){
            this._cdr.detectChanges();}
        },
        error: (err) => {
          console.log('Error => ', err.message.toString());
        }
      });
    }
  }
}

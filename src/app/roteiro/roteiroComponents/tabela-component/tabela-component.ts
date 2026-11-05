import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ButtonComponent } from '../../../components/button-component/button-component';
import { RouterLink } from '@angular/router';
import { RoteiroInterface } from '../../roteiro-models/roteiro-models';
import { RoteiroService } from '../../roteiro-service/service';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [RouterLink, ButtonComponent, CurrencyPipe],
  selector: 'app-tabela-component',
  styleUrl: './tabela-component.scss',
  templateUrl: './tabela-component.html',
})
export class TabelaComponent {
  @Input() roteiros: RoteiroInterface[]=[];
  id!:number;

   constructor(
    private roteiroService: RoteiroService,
    private _cdr: ChangeDetectorRef
  ){
    console.log("Roteiros => ", this.roteiros);
  }

  // if(roteiros[0].periodo === '1'){
  //   console.log("Periodo 1 => ", roteiros[0].periodo);
  // } else if(roteiros[0].periodo === '2'){
  //   console.log("Periodo 2 => ", roteiros[0].periodo);
  // } else if(roteiros[0].periodo === '3'){
  //   console.log("Periodo 3 => ", roteiros[0].periodo);
  // } else if(roteiros[0].periodo === '4'){
  //   console.log("Periodo 4 => ", roteiros[0].periodo);
  // } else if(roteiros[0].periodo === '5'){
  //   console.log("Periodo 5 => ", roteiros[0].periodo);
  // }

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

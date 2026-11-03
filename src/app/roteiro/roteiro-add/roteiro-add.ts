import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoteiroAddService } from './roteiro-add-service';

@Component({
  imports: [FormsModule, ReactiveFormsModule, ReactiveFormsModule],
  selector: 'app-roteiro-add',
  styleUrl: './roteiro-add.scss',
  templateUrl: './roteiro-add.html',
  providers: [RoteiroAddService]
})
export class RoteiroAdd {

  constructor(
    private roteiroAddService: RoteiroAddService
  ) { }

  roteiroSubmit() {
    // 1. Verifica se o campo está vazio e atribui a data atual se necessário
    const dataCampo = this.roteiroForm.get('data')?.value;
    if (!dataCampo || dataCampo === '') {
      const dataAtual = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

      this.roteiroForm.patchValue({
        data: dataAtual
      });
    }
    console.log("Submi => ", this.roteiroForm.value);
    this.roteiroAddService.setRoteiro(this.roteiroForm.getRawValue());
    setTimeout(() => {
      this.ZeraForm();
    }, 2000
    );
  }

  roteiroForm = new FormGroup({
    id: new FormControl(0,{nonNullable:true}),
    cliente: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    cidade: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    bairro: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    observacao: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    cartao: new FormControl(0, { nonNullable: true }),
    lojaPolimedica: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    pedidoNf: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    dinheiroCheque: new FormControl(0, { nonNullable: true }),
    troco: new FormControl(0, { nonNullable: true }),
    vendedor: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    responsavel: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    periodo: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    data: new FormControl('', { nonNullable: true }),
    hora: new FormControl('', { validators: [Validators.required], nonNullable: true })
  });

  ZeraForm() {
    this.roteiroForm.setValue({
      id: 0,
      cliente: '',
      cidade: '',
      bairro: '',
      observacao: '',
      cartao: 0,
      lojaPolimedica: '',
      pedidoNf: '',
      dinheiroCheque: 0,
      troco: 0,
      vendedor: '',
      responsavel: '',
      data: '',
      hora: '',
      periodo: '',
    })
  }

}



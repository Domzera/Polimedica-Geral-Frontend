import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoteiroAddService } from './roteiro-add-service';
import { RoteiroInterface } from '../roteiro-models/roteiro-models';

@Component({
  imports: [FormsModule, ReactiveFormsModule, ReactiveFormsModule],
  selector: 'app-roteiro-add',
  styleUrl: './roteiro-add.scss',
  templateUrl: './roteiro-add.html',
  providers: [RoteiroAddService]
})
export class RoteiroAdd {
  
  constructor(
    private roteiroAddService : RoteiroAddService
  ){}

  roteiroSubmit() {
    console.log("Submi =>" + this.roteiroForm.value);
    this.roteiroAddService.addRoteiro(this.roteiroForm.getRawValue());
    this.ZeraForm();
  }

  roteiroForm = new FormGroup({
    cliente: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    cidade: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    bairro: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    observacao: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    cartao: new FormControl(0,{nonNullable: true}),
    loja_polimedica: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    pedido_nf: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    dinheiro_cheque: new FormControl(0,{nonNullable: true}),
    troco: new FormControl(0,{nonNullable: true}),
    vendedora: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    responsavel: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    //data: new FormControl(new Date().toISOString().substring(0, 10), [Validators.required]),
    data: new FormControl('',{nonNullable: true}),
    hora: new FormControl('', {validators: [Validators.required], nonNullable: true})
  });

  ZeraForm() {
    this.roteiroForm.setValue({
      cliente: '',
      cidade: '',
      bairro: '',
      observacao: '',
      cartao: 0,
      loja_polimedica: '',
      pedido_nf: '',
      dinheiro_cheque: 0,
      troco: 0,
      vendedora: '',
      responsavel: '',
      data:'',
      hora: '',
    })
  }

}



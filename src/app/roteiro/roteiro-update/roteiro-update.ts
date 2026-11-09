import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RoteiroService } from '../roteiro-service/service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiInterface } from '../roteiro-models/api-model';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-roteiro-update',
  styleUrl: './roteiro-update.scss',
  templateUrl: './roteiro-update.html',
})
export class RoteiroUpdate implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private roteiroSerevice: RoteiroService
  ) {}

  roteiroForm = new FormGroup({
    id: new FormControl(0,{nonNullable:true}),
    cliente: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    cidade: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    bairro: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    observacao: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    cartao: new FormControl(0, { nonNullable: true }),
    lojaPolimedica: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    pedidoNf: new FormControl('', { nonNullable: true }),
    dinheiroCheque: new FormControl(0, { nonNullable: true }),
    troco: new FormControl(0, { nonNullable: true }),
    vendedor: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    responsavel: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    periodo: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    data: new FormControl('', { nonNullable: true }),
  })

    ngOnInit(): void {
    // Captura o ID da URL de forma segura e reativa
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {this.carregar(id);}
    });
  }

  carregar = (id: number) => {
    this.roteiroSerevice.getRoteiroById(id).subscribe({
      next: (result) => {
        console.log('Result =>', result);
        this.carregaForm(result);
      },
      error: (err) => {
        console.error('Erro ao carregar o roteiro:', err);
      }
    });
  }

  carregaForm(result: ApiInterface) {
  this.roteiroForm.patchValue({
      id: result.id,
      cliente: result.cliente,
      cidade: result.cidade,
      bairro: result.bairro,
      observacao: result.observacao,
      cartao: result.cartao || 0,
      lojaPolimedica: result.lojaPolimedica,
      pedidoNf: result.pedidoNf,
      dinheiroCheque: result.dinheiroCheque || 0,
      troco: result.troco || 0,
      vendedor: result.vendedor || '',
      responsavel: result.responsavel || '',
      data: result.data || '',
      periodo: result.periodo,
    });
    this.cdr.detectChanges(); // Garante que a view seja atualizada após o patchValue
  }  

  roteiroSubmit() {
    if (this.roteiroForm.invalid) {
      this.roteiroForm.markAllAsTouched();
      return;
    }
    const dados = this.roteiroForm.getRawValue();

    this.roteiroSerevice.updateRoteiro(dados.id, dados).subscribe({
      next: () => {
        this.router.navigate(['/roteiro'])
      },
      error: (err) => window.alert('Erro ao salvar: ' + err.message),
    });
  }
}
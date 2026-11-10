import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoteiroService } from '../roteiro-service/service';
import { ApiInterface } from '../roteiro-models/api-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule,FormsModule],
  selector: 'app-roteiro-reagendar',
  styleUrl: './roteiro-reagendar.scss',
  templateUrl: './roteiro-reagendar.html',
})
export class RoteiroReagendar {

  roteiro?: ApiInterface;
  dataSelecionada: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roteiroSerevice: RoteiroService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Captura o ID da URL de forma segura e reativa
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) { this.carregar(id); }
    });
  }

  carregar = (id: number) => {
    this.roteiroSerevice.getRoteiroById(id).subscribe({
      next: (result) => {
        console.log('Result =>', result);
        this.roteiro = result;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar o roteiro:', err);
      }
    });
  }

  reagendar() {
    console.log('Nova data selecionada:', this.dataSelecionada);
    this.roteiro!.data = this.dataSelecionada; // Atualiza a data do roteiro com a nova data selecionada

    this.roteiroSerevice.addRoteiro(this.roteiro!).subscribe({
      next: (result) => {
        console.log('Roteiro reagendado com sucesso:', result);
        this.router.navigate(['/roteiro']);
      },
      error: (err) => {
        console.error('Erro ao reagendar o roteiro:', err);
      }
    });
  }
}

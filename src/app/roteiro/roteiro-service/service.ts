import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoteiroInterface } from '../roteiro-models/roteiro-models'

@Injectable({
    providedIn: 'root'
})
export class RoteiroService{
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'www';
    
    listar(): Observable<RoteiroInterface[]> {
    return this.http.get<RoteiroInterface[]>(this.apiUrl);
  }

  // Exemplo de criação (POST)
  salvar(roteiro: RoteiroInterface): Observable<RoteiroInterface> {
    return this.http.post<RoteiroInterface>(this.apiUrl, roteiro);
  }
}
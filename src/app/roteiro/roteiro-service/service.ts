import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiInterface } from '../roteiro-models/api-model';

@Injectable({
  providedIn: 'root'
})
export class RoteiroService {
  private readonly _http = inject(HttpClient);
  private readonly _url = 'http://192.168.1.37:82/polimedica';

  addRoteiro(roteiro: ApiInterface) {
    const url = `${this._url}/roteiro`;
    
    return this._http.post<ApiInterface>(url, roteiro, { responseType: 'text' });
  }

  getRoteiro(data?: Date): Observable<ApiInterface[]> {
    const ano = data!.getFullYear();
    const mes = data!.getMonth() + 1;
    const dia = data!.getDate();

    const url = `${this._url}/roteiro/${ano}/${mes}/${dia}`;

    return this._http.get<ApiInterface[]>(url, {responseType: 'json'});
  }

  deleteRoteiro(id:number): Observable<number>{
    const url = `${this._url}/roteiro/${id}`;

    return this._http.delete<number>(url, {responseType: 'json'});
  }

  getRoteiroById(id:number): Observable<ApiInterface>{
    const url = `${this._url}/roteiro/${id}`;

    return this._http
    .get<{value: ApiInterface}>(url, {responseType: 'json'})
    .pipe(map(resp => resp.value));
  }

  updateRoteiro(id: number, dados: ApiInterface): Observable<ApiInterface> {
    console.log('Dados enviados para atualização:', dados);
    const url = `${this._url}/roteiro/${id}`;
    return this._http.put<ApiInterface>(url, dados, { responseType: 'text' });
  }
}
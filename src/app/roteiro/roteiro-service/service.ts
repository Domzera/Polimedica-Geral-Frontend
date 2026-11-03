import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RoteiroInterface } from '../roteiro-models/roteiro-models'
import { Observable } from 'rxjs';
import { ApiInterface } from '../roteiro-models/api-model';

@Injectable({
  providedIn: 'root'
})
export class RoteiroService {
  private readonly _http = inject(HttpClient);
  private readonly _url = 'http://192.168.1.37:82/polimedica';

  addRoteiro(roteiro: RoteiroInterface) {
    const url = `${this._url}/roteiro`;
    
    return this._http.post<RoteiroInterface>(url, roteiro, { responseType: 'text' });
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
}
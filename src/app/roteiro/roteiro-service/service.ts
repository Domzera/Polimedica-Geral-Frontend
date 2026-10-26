import { HttpClient, HttpParams } from '@angular/common/http';
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
    return this._http.post<RoteiroInterface>(this._url + '/roteiro', roteiro, { responseType: 'text' });
  }

  getRoteiro(data?: Date): Observable<ApiInterface[]> {
    let params =new HttpParams();
    if(data){
      params = params.set('data', data.toISOString().split('T')[0]);
    }
    return this._http.get<ApiInterface[]>(this._url + '/roteiro', { params });
  }
}
import { Injectable } from '@angular/core';
import { RoteiroService } from '../roteiro-service/service';
import { ApiInterface } from '../roteiro-models/api-model';
import { Observable } from 'rxjs';
import { RoteiroInterface } from '../roteiro-models/roteiro-models';

@Injectable({providedIn: 'root'})
export class RoteiroHomeService {
    constructor(private readonly roteiroService: RoteiroService){}

    getRoteiro(data: Date): Observable<ApiInterface[]>{
        return this.roteiroService.getRoteiro(data);
    }
}

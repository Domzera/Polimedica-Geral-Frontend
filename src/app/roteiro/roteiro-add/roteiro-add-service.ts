import { Injectable } from '@angular/core';
import { RoteiroInterface } from '../roteiro-models/roteiro-models';

@Injectable()
export class RoteiroAddService {
  constructor() { }
  
  
  addRoteiro(roteiro: RoteiroInterface){
    console.log("Aqui está o form:\n" + roteiro.data);

  }
}

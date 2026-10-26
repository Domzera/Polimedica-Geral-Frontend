import { Injectable } from '@angular/core';
import { RoteiroInterface } from '../roteiro-models/roteiro-models';
import { RoteiroService } from '../roteiro-service/service';

@Injectable()
export class RoteiroAddService {
      constructor(private readonly roteiroService: RoteiroService) {}
  
  setRoteiro(roteiro: RoteiroInterface) {
    //Fazer os tratamentos, caso precise, aqui..
    
    // Depois envir para o post.
    this.roteiroService.addRoteiro(roteiro).subscribe({
      next: (result) =>{
        console.log('Sucesso ao cadastrar', result);
      },
      error: (err) => {
        console.log('Error => ', err);
      }
    })
  }
}

import { Injectable } from '@angular/core';
import { RoteiroService } from '../roteiro-service/service';
import { ApiInterface } from '../roteiro-models/api-model';

@Injectable()
export class RoteiroAddService {
      constructor(private readonly roteiroService: RoteiroService) {}
  
  setRoteiro(roteiro: ApiInterface) {
    
    // Depois envir para o post.
    this.roteiroService.addRoteiro(roteiro).subscribe({
      next: (result) =>{
        console.log('Sucesso ao cadastrar', result);
      },
      error: (err) => {
        console.log('Error => ', err);
        window.confirm('O Erro foi: ' + err.message.toString());
      }
    })
  }
}

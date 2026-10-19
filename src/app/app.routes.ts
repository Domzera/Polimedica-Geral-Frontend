import { RoteiroHome } from "./roteiro/roteiro-home/roteiro-home";
import { RoteiroAdd } from "./roteiro/roteiro-add/roteiro-add";

import { Routes } from '@angular/router';
import { RoteiroPrint } from "./roteiro/roteiro-print/roteiro-print";

export const routes: Routes = [
    { path: 'roteiro', component: RoteiroHome },
    { path: 'roteiro/adicionar', component: RoteiroAdd},
    { path: 'roteiro/imprimir' , component: RoteiroPrint},
];

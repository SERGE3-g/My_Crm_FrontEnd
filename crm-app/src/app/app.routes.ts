import { Routes } from '@angular/router';


export const routes: Routes = [

  {path:'client',loadComponent:()=> import('./pages/client-list/client-list.component')},

  { path: '', redirectTo: 'home', pathMatch: 'full' },

];

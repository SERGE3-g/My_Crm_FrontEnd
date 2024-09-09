import { Routes } from '@angular/router';
import {DashboardComponent} from "./homes/dashboard/dashboard.component";


export const routes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  {path:'client-list',loadComponent:()=> import('./pages/client-list/client-list.component')},
  {path :'task',loadComponent:()=> import('./pages/task/task.component')},
  {path :'sale',loadComponent:()=> import('./pages/sale/sale.component')},
  {path :'user',loadComponent:()=> import('./pages/user/user.component')},
  {path :'activity',loadComponent:()=> import('./pages/activity/activity.component')},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

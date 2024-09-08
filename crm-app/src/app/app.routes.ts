import { Routes } from '@angular/router';
import {ClientComponent} from "./pages/client/client.component";

export const routes: Routes = [
  {path:'client',component:ClientComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },

];

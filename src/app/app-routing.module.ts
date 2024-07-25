import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Landing } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { Principal } from './components/principal/principal.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'principal', component: Principal },
  { path: 'landing', component: Landing }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

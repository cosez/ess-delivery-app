import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
<<<<<<< HEAD
=======
import { StatusComponent } from './status/status.component';
import { PedidoComponent } from './pedido/pedido.component';
>>>>>>> cozes/master

const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
<<<<<<< HEAD
  { path: 'profile', component: ProfileComponent },
  { path: 'cadastro', component: CadastroComponent}];
=======
  { path: 'cadastro', component: CadastroComponent },
  { path: 'status', component: StatusComponent },
  { path: 'pedido', component: PedidoComponent }];
>>>>>>> f1a25e0 (add authentication and delete actions)

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

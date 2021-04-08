import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { UsersComponent } from './components/users/users.component';
import { UsersFormComponent } from './components/users/users.form.component';
import { ComponentsComponent } from './components/components/components.component';
import { ComponentsDetailComponent } from './components/components/components.detail.component';
import { ComponentsDetailShowComponent } from './components/components/components.detail.show.component';
import { AuthGuard } from './config/guards/auth.guard';
import { RoleGuard } from './config/guards/role.guard';

const routes: Routes = [
  { path : '', redirectTo : '/login', pathMatch : 'full' },
  { path : 'login', component : LoginComponent },
  { path : 'index', component : IndexComponent, canActivate : [AuthGuard] },
  { path : 'users', component : UsersComponent, canActivate : [AuthGuard, RoleGuard], data: { roles : ['ROLE_ADMIN']} },
  { path : 'users/form', component : UsersFormComponent, canActivate : [AuthGuard, RoleGuard], data: { roles : ['ROLE_ADMIN']} },
  { path : 'users/form/:userNameParam', component : UsersFormComponent, canActivate : [AuthGuard, RoleGuard], data: { roles : ['ROLE_ADMIN']} },
  { path : 'components', component : ComponentsComponent, canActivate : [AuthGuard, RoleGuard], data: { roles : ['ROLE_ADMIN', 'ROLE_USER']}  },
  { path : 'components/detail', component : ComponentsDetailComponent, canActivate : [AuthGuard, RoleGuard], data: { roles : ['ROLE_ADMIN', 'ROLE_USER']}  },
  { path : 'components/show/:component', component : ComponentsDetailShowComponent, canActivate : [AuthGuard, RoleGuard], data: { roles : ['ROLE_ADMIN', 'ROLE_USER']}  },
  { path: '**', redirectTo: '/index'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

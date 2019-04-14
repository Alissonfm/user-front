import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@core/components/login/login.component';
import { AdminComponent } from '@shared/components/admin/admin.component';
import { Role } from '@shared/enums/role.enum';
import { AuthGuard } from '@core/guards/auth.guard';
import { HomeComponent } from '@core/components/home/home.component';

const API_ROUTES: Routes = [
  {
    path: '', 
    component: HomeComponent
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [AuthGuard], 
    data: { roles: [Role.Admin] } 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(API_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

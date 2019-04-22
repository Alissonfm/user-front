import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@core/components/login/login.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { HomeComponent } from '@pages/home/home.component';
import { PagesModule } from './pages/pages.module';
import { PagesComponent } from './pages/pages.component';
import { PeopleModule } from '@pages/people/people.module';
import { AddressModule } from '@pages/address/address.module';

const API_ROUTES: Routes = [
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'enderecos',
        loadChildren: './address/address.module#AddressModule'
      },
      {
        path: 'pessoas',
        loadChildren: './people/people.module#PeopleModule'
      },
      {
        path: 'tipos-enderecos',
        loadChildren: './type-address/type-address.module#TypeAddressModule'
      },
    ]
  }
];

/*
const API_ROUTES: Routes = [
  {
    path: '', 
    component: LoginComponent
  },
  {
    path: 'home', 
    component: HomeComponent
  },
  {
    path: 'app',
    component: PagesComponent,
    children: [
      {
        path: 'pessoas',
        loadChildren: './people/people.module#PeopleModule'
      },
      {
        path: 'enderecos',
        loadChildren: './address/address.module#AddressModule'
      }
    ]
  }
];
*/

/*
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
*/

@NgModule({
  imports: [PagesModule, PeopleModule, AddressModule, RouterModule.forRoot(API_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

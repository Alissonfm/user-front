import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@core/components/login/login.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { HomeComponent } from '@pages/home/home.component';
import { PagesModule } from './pages/pages.module';
import { PagesComponent } from './pages/pages.component';
import { PeopleModule } from '@pages/people/people.module';
import { AddressModule } from '@pages/address/address.module';
import { TypeAddressModule } from './pages/type-address/type-address.module';

const API_ROUTES: Routes = [
  {
    path: '', 
    component: LoginComponent
  },
  {
    path: 'app',
    component: PagesModule,
  }
];

/*
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
*/


@NgModule({
  imports: [PagesModule, PeopleModule, AddressModule, TypeAddressModule, RouterModule.forRoot(API_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

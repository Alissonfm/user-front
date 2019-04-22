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
    component: LoginComponent,
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    loadChildren: './pages/pages.modules#PagesModule',
  }
];

@NgModule({
  imports: [PagesModule, PeopleModule, AddressModule, TypeAddressModule, RouterModule.forRoot(API_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

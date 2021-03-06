import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { PeopleModule } from './people/people.module';
import { Routes, RouterModule } from '@angular/router';
import { LocalService } from '@app/shared/service/local.service';
import { AddressModule } from './address/address.module';
import { TypeAddressModule } from './type-address/type-address.module';
import { AuthGuard } from '@app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'app',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'enderecos',
        component: AddressModule,
        canActivate: [AuthGuard],
      },
      {
        path: 'pessoas',
        component: PeopleModule,
        canActivate: [AuthGuard],
      },
      {
        path: 'tipos-enderecos',
        component: TypeAddressModule,
        canActivate: [AuthGuard],
      },

    ]
  },
];

/*
const routes: Routes = [
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
  },
];
*/


@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent
  ],
  imports: [
    SharedModule, 
    PeopleModule,
    AddressModule,
    TypeAddressModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    LocalService,
  ]
})
export class PagesModule { }

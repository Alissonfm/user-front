import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { AddressComponent } from './address.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { AuthGuard } from '@app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'enderecos',
    component: AddressComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'listar',
        component: ListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'adicionar',
        component: CreateEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'editar',
        component: CreateEditComponent,
        canActivate: [AuthGuard],
      }
    ]
  },
];

@NgModule({
  declarations: [ListComponent, CreateEditComponent, AddressComponent],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes)
  ]
})
export class AddressModule {}

import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { AddressComponent } from './address.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';

const routes: Routes = [
  {
    path: 'enderecos',
    component: AddressComponent,
    children: [
      {
        path: 'listar',
        component: ListComponent,
      },
      {
        path: 'adicionar',
        component: CreateEditComponent
      },
      {
        path: 'editar',
        component: CreateEditComponent
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

import { NgModule } from '@angular/core';
import { TypeAddressComponent } from './type-address.component';
import { ListComponent } from './list/list.component';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';

const routes: Routes = [
  {
    path: 'tipo-enderecos',
    component: TypeAddressComponent,
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
  declarations: [TypeAddressComponent, ListComponent, CreateEditComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class TypeAddressModule { }

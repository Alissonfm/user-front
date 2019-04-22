import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypeAddressComponent } from './type-address.component';
import { ListComponent } from './list/list.component';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { SharedModule } from '@app/shared/shared.module';

const routes: Routes = [
  {
    path: 'tipos-enderecos',
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
  declarations: [ListComponent, CreateEditComponent, TypeAddressComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class TypeAddressModule { }

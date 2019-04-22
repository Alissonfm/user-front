import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypeAddressComponent } from './type-address.component';
import { ListComponent } from './list/list.component';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { SharedModule } from '@app/shared/shared.module';
import { AuthGuard } from '@app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'tipos-enderecos',
    component: TypeAddressComponent,
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
        canActivate: [AuthGuard]
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

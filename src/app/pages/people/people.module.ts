import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { PeopleComponent } from './people.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { AuthGuard } from '@app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'pessoas',
    component: PeopleComponent,
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
  declarations: [ListComponent, CreateEditComponent, PeopleComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PeopleModule { }

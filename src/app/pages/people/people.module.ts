import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { PeopleComponent } from './people.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';

const routes: Routes = [
  {
    path: 'pessoas',
    component: PeopleComponent,
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
  declarations: [ListComponent, CreateEditComponent, PeopleComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PeopleModule { }

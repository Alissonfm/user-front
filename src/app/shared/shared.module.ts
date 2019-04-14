import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CoreModule 
  ]
})
export class SharedModule { }

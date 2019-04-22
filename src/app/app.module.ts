import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';

@NgModule({ declarations: [AppComponent],
  imports: [
    CoreModule,
    AppRoutingModule
  ],
  providers: [
    //{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

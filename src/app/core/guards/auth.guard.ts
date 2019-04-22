import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, CanLoad, Route } from '@angular/router';
import { AuthenticationService } from '@shared/service/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
  export class AuthGuard implements CanActivate, CanLoad  {
    constructor(
      private router: Router,
      private authSvc: AuthenticationService
  ) {}

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    console.log(
      this.authSvc.check()
    );
      if (this.authSvc.check()) {
        // check if route is restricted by role
        // authorised so return true
        return true;
      }
      // not logged in so redirect to login page with the return url
      this.router.navigate(['']);
      return false;
  }

  canActivate(activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {    
    console.log(
      this.authSvc.check()
    );
      if (this.authSvc.check()) {
        // check if route is restricted by role
        // authorised so return true
        return true;
      }
      // not logged in so redirect to login page with the return url
      this.router.navigate(['']);
      return false;
  }

  canActivateChild(activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(
      this.authSvc.check()
    );
      if (this.authSvc.check()) {
        // check if route is restricted by role
        // authorised so return true
        return true;
      }
      // not logged in so redirect to login page with the return url
      this.router.navigate(['']);
      return false;
  }
}

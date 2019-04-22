import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '@shared/service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(
    private router: Router,
    private authSvc: AuthenticationService
) {}

canActivate() {
    
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

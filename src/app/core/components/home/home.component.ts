import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@shared/models/user.model';
import { UserService } from '@shared/service/user.service';
import { AuthenticationService } from '@shared/service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  currentUser: User;
  userFromApi: User;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    console.log(this.currentUser)
    this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => { 
        this.userFromApi = user;
    });
  }

}

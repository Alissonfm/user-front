import { Component, OnInit } from '@angular/core';
import { User } from '@shared/models/user.model';
import { first } from 'rxjs/operators';
import { UserService } from '@shared/service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
      this.userService.getAll().pipe(first()).subscribe(users => { 
        this.users = users; 
      });
  }

}

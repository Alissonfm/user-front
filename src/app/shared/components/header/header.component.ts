import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/shared/service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private authSvc: AuthenticationService
  ) { }

  ngOnInit() {
  }

  goTo(url: string){
    this.router.navigate([url]);
  }

  logout(){
    if(this.authSvc.logout()){
      this.router.navigateByUrl('');
    };
  }

}

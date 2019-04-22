import { Component, OnInit } from '@angular/core';
import { TypeAddressService } from '@app/shared/service/type-address.service';
import { LocalService } from '@app/shared/service/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  dataSource: any;s

  columnsToDisplay = [
    'number',
    'active'
  ];

  constructor(
    public taSvc: TypeAddressService, 
    public transpSvc: LocalService, 
    public route: Router
  ) { }

  ngOnInit() {
    this.taSvc.getAll().subscribe(
      (response) => {
        this.dataSource = response;
      }
    );
  }

  editar(data){
    console.log(data);
    this.transpSvc.data = data;
    this.route.navigateByUrl("app/type-address/editar");
  }

  deletar(data){
    this.taSvc.delete(data);
    this.taSvc.getAll().subscribe(
      (response) => {
        console.log(response);
        this.dataSource = response;
      }
    );
  }

}

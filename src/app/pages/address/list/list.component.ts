import { Component, OnInit } from '@angular/core';
import { AddressService } from '@app/shared/service/address.service';
import { LocalService } from '@app/shared/service/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  dataSource: any;
  columnsToDisplay = [
    'name',
    'active',
    'streetName',
    'number',
    'description',
    'complement'
  ];

  constructor(
    public addrSvc: AddressService, 
    public transpSvc: LocalService, 
    public route: Router
  ) {}

  ngOnInit() {
    this.addrSvc.getAll().subscribe(
      (response) => {
        console.log(response);
        this.dataSource = response;
      }
    );
  }

  editar(data){
    console.log(data);
    this.transpSvc.data = data;
    this.route.navigateByUrl("app/pessoas/editar");
  }

  deletar(data){
    this.addrSvc.delete(data);
    this.addrSvc.getAll().subscribe(
      (response) => {
        console.log(response);
        this.dataSource = response;
      }
    );
  }

}

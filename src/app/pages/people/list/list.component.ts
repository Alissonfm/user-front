import { Component, OnInit } from '@angular/core';
import { PeopleService } from '@app/shared/service/people.service';
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
    'document',
    'rgie',
    'peopleType',
    'mailAddress',
    'phone',
    'cellPhone',
    'birth',
    'employesAmount',
    'edit',
    'delete'
  ];

  constructor(
    public peopleSvc: PeopleService, 
    public transpSvc: LocalService, 
    public route: Router
  ) {}

  ngOnInit() {

    this.peopleSvc.getAll().subscribe(
      (response) => {
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

    this.peopleSvc.delete(data);

    this.peopleSvc.getAll().subscribe(
      (response) => {
        console.log(response);
        this.dataSource = response;
      }
    );
  }

}

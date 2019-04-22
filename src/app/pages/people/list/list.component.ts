import { Component, OnInit, ViewChild } from '@angular/core';
import { PeopleService } from '@app/shared/service/people.service';
import { LocalService } from '@app/shared/service/local.service';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material';
import { ExportServiceService } from '@app/shared/service/export-service.service';

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
    'address',
    'edit',
    'delete'
  ];

  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    public peopleSvc: PeopleService, 
    public transpSvc: LocalService, 
    public exportSvc: ExportServiceService,
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
    this.transpSvc.data = data;
    this.route.navigateByUrl("pessoas/editar");
  }

  deletar(data){
    this.peopleSvc.delete(data).subscribe(
      (response) => {
        this.peopleSvc.getAll().subscribe(
          (response) => {
            console.log(response);
            this.dataSource = response;
            this.table.renderRows();
          }
        );
      }
    );
  }

  exportar(){
    this.exportSvc.exportAsExcelFile(this.dataSource, "pessoas");
  }

}

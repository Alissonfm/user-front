import { Component, OnInit, ViewChild } from '@angular/core';
import { AddressService } from '@app/shared/service/address.service';
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
    'active',
    'streetName',
    'number',
    'description',
    'complement',
    'edit',
    'delete'
  ];

  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    public addrSvc: AddressService, 
    public transpSvc: LocalService,
    public exportSvc: ExportServiceService,
    public route: Router
  ) {}

  ngOnInit() {
    console.log(this.route);
    this.addrSvc.getAll().subscribe(
      (response) => {
        this.dataSource = response;
      }
    );
  }

  editar(data){
    this.transpSvc.data = data;
    this.route.navigateByUrl("enderecos/editar");
  }

  deletar(data){
    this.addrSvc.delete(data).subscribe(
      (response) => {
        this.addrSvc.getAll().subscribe(
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
    this.exportSvc.exportAsExcelFile(this.dataSource, "enderecos");
  }

}

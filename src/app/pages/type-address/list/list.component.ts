import { Component, OnInit, ViewChild } from '@angular/core';
import { TypeAddressService } from '@app/shared/service/type-address.service';
import { LocalService } from '@app/shared/service/local.service';
import { Router } from '@angular/router';
import { TypeAddress } from '@shared/models/type-address.model';
import {MatTable} from '@angular/material';
import { ExportServiceService } from '@app/shared/service/export-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  dataSource: Array<TypeAddress>;
  
  @ViewChild(MatTable) table: MatTable<any>;

  columnsToDisplay = [
    'name',
    'active',
    'edit',
    'delete'
  ];

  constructor(
    public taSvc: TypeAddressService, 
    public transpSvc: LocalService,
    public exportSvc: ExportServiceService,
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
    this.route.navigateByUrl("tipos-enderecos/editar");
  }

  deletar(data){
    this.taSvc.delete(data).subscribe(
      (response) => {
        this.taSvc.getAll().subscribe(
          (response) => {
            this.dataSource = response;
            this.table.renderRows();
          }
        );
      }
    )
  }

  exportar(){
    this.exportSvc.exportAsExcelFile(this.dataSource, "enderecos");
  }

}

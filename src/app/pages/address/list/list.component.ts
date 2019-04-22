import { Component, OnInit, ViewChild } from '@angular/core';
import { AddressService } from '@app/shared/service/address.service';
import { LocalService } from '@app/shared/service/local.service';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material';
import { ExportServiceService } from '@app/shared/service/export-service.service';
import { Address } from '@shared/models/address.model';
import { DataSource } from '@angular/cdk/table';
import { MatInput } from "@angular/material";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  dataSource: any;
  dataSourceBkp: any;
  dataSourceFiltrado: any;
  hideTable: boolean = true;

  columnsToDisplay = [
    'name',
    'active',
    'streetName',
    'number',
    'description',
    'complement',
    'typeAddress',
    'edit',
    'delete'
  ];

  statusFilterOpts = [
    { value: true, viewValue: "Todos"},
    { value: true, viewValue: "Ativos"},
    { value: false, viewValue: "Desativados"}
  ];

  nomeFilterTxt = "";
  statusfilterTxt = "Todos";

  filtros: any;

  tiposEnderecos: any;

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
            this.dataSourceBkp = response;
            this.table.renderRows();
          }
        );
      }
    );
  }

  exportar(){
    this.exportSvc.exportAsExcelFile(this.dataSource, "enderecos");
  }

  filterStatusChange(e){
    this.statusfilterTxt = e;
    console.log(e);
  }

  verTodosOsRetistros(){
    this.hideTable = false;
    this.dataSourceFiltrado = undefined;
    this.addrSvc.getAll().subscribe(
      (response) => {
        this.dataSource = response;
        this.table.renderRows();
      }
    )
  }

  filtrar(){
    console.log("Data source inicial:");
    console.log(this.dataSource);

    let $this = this;
    this.hideTable = true;

    if(this.nomeFilterTxt != ""){
      this.dataSourceFiltrado = this.loopWithReturn(
        this.dataSource, 
        (element) => {
          let rg = new RegExp($this.nomeFilterTxt, "gi");
          if( rg.test(element.name) ){
            return element;
          }
          return undefined;
        }
      );
    }

    console.log("Filtro de nome");
    console.log(this.dataSourceFiltrado);

    if(this.statusfilterTxt != "Todos"){
      this.dataSourceFiltrado = this.loopWithReturn(
        this.dataSource, 
        (element) => {
          if( element.active == $this.statusfilterTxt ){
            return element;
          }
          return undefined;
        }
      );
    }

    console.log("Filtro de status");
    console.log(this.dataSourceFiltrado);

    if(this.dataSourceFiltrado != undefined ) {
      this.dataSource = this.dataSourceFiltrado;
      this.table.renderRows();
    } else {
      this.dataSource = this.dataSourceBkp;
      this.table.renderRows();
    }

    console.log("Data Source final:");
    console.log(this.dataSource);
    this.hideTable = false;
  }

  loopWithReturn(array: any, callback: any){
    let arr = [];
    let retorno: any;
    for(let i=0; i < array.length; i++){
      retorno = callback(array[i]);
      if(retorno) {
        arr.push(retorno);
      } 
    }
    return arr;
  }

}

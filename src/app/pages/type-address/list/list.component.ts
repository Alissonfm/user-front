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
  dataSourceBkp: Array<TypeAddress>;
  dataSourceFiltrado: Array<TypeAddress>;
  tiposFilter

  hideTable: boolean = true;
  
  @ViewChild(MatTable) table: MatTable<any>;

  nomeFilterTxt = "";
  statusFilterTxt = "Todos";

  statusFilterOpts = [
    { value: true, viewValue: "Todos"},
    { value: true, viewValue: "Ativos"},
    { value: false, viewValue: "Desativados"}
  ];

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
            this.dataSourceBkp = response;
            this.table.renderRows();
          }
        );
      }
    )
  }

  exportar(){
    this.exportSvc.exportAsExcelFile(this.dataSource, "enderecos");
  }

  verTodosOsRetistros(){
    this.hideTable = false;
    this.taSvc.getAll().subscribe(
      (response) => {
        this.dataSource = response;
        this.table.renderRows();
      }
    )
  }

  filtrar(){
    console.log("Data source inicial:");
    console.log(this.dataSource);
    console.log(this.nomeFilterTxt);

    let $this = this;
    this.limparFiltro();
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

    if(this.statusFilterTxt != "Todos"){
      this.dataSourceFiltrado = this.loopWithReturn(
        this.dataSource, 
        (element) => {
          if( element.active == $this.statusFilterTxt ){
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

  limparFiltro(){
    this.dataSource = this.dataSourceBkp;
    this.dataSourceFiltrado = undefined;
    this.table.renderRows();
  }

  loopWithReturn(array: Array<any>, callback: any){
    console.log(array);
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

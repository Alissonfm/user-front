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
  dataSourceBkp: any;
  dataSourceFiltrado: any;
  hideTable: boolean = true;

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

  peopletTypeFilterOpts = [
    { value: "F", viewValue: "Todos"},
    { value: "F", viewValue: "Pessoa Física"},
    { value: "J", viewValue: "Pessoa Jurídica"}
  ];

  nomeFilterTxt = "";
  statusfilterTxt = "Todos";

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

  filterStatusChange(e){
    this.statusfilterTxt = e;
    console.log(e);
  }

  verTodosOsRetistros(){
    this.hideTable = false;
    this.dataSourceFiltrado = undefined;
    this.peopleSvc.getAll().subscribe(
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
          if( element.peopleType == $this.statusfilterTxt ){
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

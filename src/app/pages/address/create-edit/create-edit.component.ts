import { Component, OnInit } from '@angular/core';
import { AddressService } from '@app/shared/service/address.service';
import { Address } from '@shared/models/address.model'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalService } from '@app/shared/service/local.service';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit {

  addresOpts: any;
  tipoSelecionado: string;
  currentAddress: Address;
  novoEndereco: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private addresSvc: AddressService,
    private transpSvc: LocalService
  ) {
    this.addresOpts = [
      { value: true, viewValue: "Sim"},
      { value: false, viewValue: "Não"}
    ];
  }

  ngOnInit() {
    if(this.transpSvc.data) {

      let campos = this.transpSvc.data;
      this.novoEndereco = this.formBuilder.group({
        name: [campos.name, Validators.required],
        active: [campos.active, Validators.required],
        streetName: [campos.streetName, Validators.required],
        number: [campos.number, Validators.required],
        description: [campos.description, Validators.required],
        complement: [campos.complement, Validators.required]
      });

    } else {

      this.novoEndereco = this.formBuilder.group({
        name: ['', Validators.required],
        active: ['', Validators.required],
        streetName: ['', Validators.required],
        number: ['', Validators.required],
        description: ['', Validators.required],
        complement: ['', Validators.required]
      });
    }
  }

  getTitle(){
    if (this.transpSvc.data){
      return "editar Pessoa";
    }
    return "adicionar Pessoa";
  }

  onSubmit({value}){
    console.log(value);

    this.addresSvc.save(value).subscribe(
      (response) => {
        console.log(response);
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { AddressService } from '@app/shared/service/address.service';
import { Address } from '@shared/models/address.model'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalService } from '@app/shared/service/local.service';
import { TypeAddress } from '@app/shared/models/type-address.model';
import { TypeAddressService } from '@app/shared/service/type-address.service';

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
  tiposEndereco: any;

  constructor(
    private formBuilder: FormBuilder,
    private addresSvc: AddressService,
    private taSvc: TypeAddressService,
    private transpSvc: LocalService
  ) {
    this.addresOpts = [
      { value: true, viewValue: "Sim"},
      { value: false, viewValue: "Não"}
    ];

    this.taSvc.getAll().subscribe(
      (response) => {
        this.tiposEndereco = response.filter((item) => {
          console.log(item);
          if (item.active){
            return item;
          }
        });
      },
      (response) => {
        console.log("Erro ao pegar tipos de endereço:");
        console.log(response);
      } 
    )

    this.novoEndereco = this.formBuilder.group({
      name: ['', Validators.required],
      active: ['', Validators.required],
      streetName: ['', Validators.required],
      number: ['', Validators.required],
      description: ['', Validators.required],
      complement: ['', Validators.required],
      typeAddress: ['', Validators.required]
    });

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
        complement: [campos.complement, Validators.required],
        typeAddress: [campos.typeAddress, Validators.required]
      });

    } else {

      this.novoEndereco = this.formBuilder.group({
        name: ['', Validators.required],
        active: ['', Validators.required],
        streetName: ['', Validators.required],
        number: ['', Validators.required],
        description: ['', Validators.required],
        complement: ['', Validators.required],
        typeAddress: ['', Validators.required]
      });
    }
  }

  getTitle(){
    if (this.transpSvc.data){
      return "editar Endereço";
    }
    return "adicionar Endereço";
  }

  onSubmit({value}){
    console.log(value);

    if(this.transpSvc.data){
      this.addresSvc.edit(value).subscribe(
        (response) => {
          console.log(response);
        },
        (response) => {
          console.log(response);
        }
      )
    } else {
      this.addresSvc.save(value).subscribe(
        (response) => {
          console.log(response);
        }
      )
    }
  }

  trocaTypeAddress(e){
    console.log(e);
  }

}

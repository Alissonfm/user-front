import { Component, OnInit } from '@angular/core';
import { People } from '@app/shared/models/people.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PeopleService } from '@app/shared/service/people.service';
import { LocalService } from '@app/shared/service/local.service';
import { AddressService } from '@app/shared/service/address.service';
import { Address } from '@app/shared/models/address.model';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit {

  tiposPessoas: any;
  tipoSelecionado: string = "";
  enderecos: any;
  enderecoSelecionado: Address;
  novoCadastro: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private peopleSvc: PeopleService,
    private transpSvc: LocalService,
    private addressSvc: AddressService
  ) {
    this.tiposPessoas = [
      {value: 'F', viewValue: 'Pessoa Física'},
      {value: 'J', viewValue: 'Pessoa Jurídica'}
    ];
    
    this.addressSvc.getAll().subscribe(
      (result) => {
        this.enderecos = result.filter((item) => {
          console.log(item);
          if (item.active){
            return item;
          }
        });
      },
      (result) => {
        console.log("falha ao pegar enderecos: ");
        console.log(result);
      }
    )

    this.novoCadastro = this.formBuilder.group({
      name: ['', Validators.required],
      document: ['', Validators.required],
      rgie: ['', Validators.required],
      peopleType: ['', Validators.required],
      mailAddress: ['', Validators.required],
      phone: ['', Validators.required],
      cellPhone: ['', Validators.required],
      birth: ['', Validators.required],
      employesAmount: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit() {
    
    if(this.transpSvc.data) {
      let campos = this.transpSvc.data;
      this.novoCadastro = this.formBuilder.group({
        name: [campos.name, Validators.required],
        document: [campos.document, Validators.required],
        rgie: [campos.rgie, Validators.required],
        peopleType: [campos.peopleType, Validators.required],
        mailAddress: [campos.mailAddress, Validators.required],
        phone: [campos.phone, Validators.required],
        cellPhone: [campos.cellPhone, Validators.required],
        birth: [campos.birth, Validators.required],
        employesAmount: [campos.employesAmount, Validators.required],
        address: [campos.address, Validators.required]
      });

    } else {
      this.novoCadastro = this.formBuilder.group({
        name: ['', Validators.required],
        document: ['', Validators.required],
        rgie: ['', Validators.required],
        peopleType: ['', Validators.required],
        mailAddress: ['', Validators.required],
        phone: ['', Validators.required],
        cellPhone: ['', Validators.required],
        birth: ['', Validators.required],
        employesAmount: ['', Validators.required],
        address: ['', Validators.required]
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
    if(this.transpSvc.data) {
      this.peopleSvc.edit(value).subscribe(
        (response) => {
          console.log(response);
        },
        (response) => {
          console.log(response);
        }
      )
    } else {
      this.peopleSvc.save(value).subscribe(
        (response) => {
          console.log(response);
        }
      )
    }
  }

  trocaTipo(e){
    console.log(e);
    this.tipoSelecionado = e;
  }

  trocaEndereco(e){
    console.log(e);
    this.enderecoSelecionado = e;
  }

}

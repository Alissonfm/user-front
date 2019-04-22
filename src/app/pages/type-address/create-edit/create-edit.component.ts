import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalService } from '@app/shared/service/local.service';
import { TypeAddressService } from '@app/shared/service/type-address.service';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit {

  options: any;
  novoTypeAddress: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private taSvc: TypeAddressService,
    private transpSvc: LocalService
  ) {
    this.options = [
      { value: "true", viewValue: "Ativo"},
      { value: "false", viewValue: "Desativado"}
    ]

    this.novoTypeAddress = this.formBuilder.group({
      number: ['', Validators.required],
      active: ['', Validators.required]
    });
  }

  ngOnInit() {
    
    if(this.transpSvc.data) {
      let campos = this.transpSvc.data;
      this.novoTypeAddress = this.formBuilder.group({
        number: [campos.number, Validators.required],
        active: [campos.active, Validators.required]
      });

    } else {
      this.novoTypeAddress = this.formBuilder.group({
        number: ['', Validators.required],
        active: ['', Validators.required]
      });
    }

  }

  getTitle(){
    if (this.transpSvc.data){
      return "editar Tipo de Endereço";
    }
    return "adicionar Tipo de Endereço";
  }

  onSubmit({value}){
    console.log(value);
    if(this.transpSvc.data) {

      this.taSvc.edit(value);

    } else {

      this.taSvc.save(value).subscribe(
        (response) => {
          console.log(response);
        }
      );

    }
  }

}

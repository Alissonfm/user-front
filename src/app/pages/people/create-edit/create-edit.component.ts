import { Component, OnInit } from '@angular/core';
import { People } from '@app/shared/models/people.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PeopleService } from '@app/shared/service/people.service';
import { LocalService } from '@app/shared/service/local.service';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit {

  tiposPessoas: any;
  tipoSelecionado: string = "";
  currentPeople: People;
  novoCadastro: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private peopleSvc: PeopleService,
    private transpSvc: LocalService
  ) {
    this.tiposPessoas = [
      {value: 'F', viewValue: 'Pessoa Física'},
      {value: 'J', viewValue: 'Pessoa Jurídica'}
    ];

    this.novoCadastro = this.formBuilder.group({
      name: ['', Validators.required],
      document: ['', Validators.required],
      rgie: ['', Validators.required],
      peopleType: ['', Validators.required],
      mailAddress: ['', Validators.required],
      phone: ['', Validators.required],
      cellPhone: ['', Validators.required],
      birth: ['', Validators.required],
      employesAmount: ['', Validators.required]
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
        employesAmount: [campos.employesAmount, Validators.required]
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
        employesAmount: ['', Validators.required]
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
    this.peopleSvc.save(value).subscribe(
      (response) => {
        console.log(response);
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/validatorField';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.validation();
  }

  get form(): any{
    return this.formGroup.controls;
  }

  private validation(): void{

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('senha','confirmeSenha')
    };

    this.formGroup = this.formBuilder.group({
      'primeiroNome': ['',Validators.required],
      'ultimoNome': ['',Validators.required],
      'email': ['',[Validators.required, Validators.email]],
      'userName': ['',Validators.required],
      'senha': ['',[Validators.required,Validators.minLength(6)]],
      'confirmeSenha': ['',Validators.required]
    },formOptions);
  }

}

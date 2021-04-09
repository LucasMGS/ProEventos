import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/validatorField';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

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
      primeiroNome: ['',Validators.required],
      ultimoNome: ['',Validators.required],
      email: ['',Validators.required],
      telefone: ['',Validators.required],
      descricao: ['',Validators.required],
      senha: ['',Validators.required],
      confirmeSenha: ['',Validators.required],
    },formOptions);
  }

  public resetForm(event: any): void {
    event.preventDefault();
    this.formGroup.reset();
  }
}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.validation();
  }


  get form():any {
    return this.formGroup.controls;
  }

  public validation(): void {


    this.formGroup = this.formBuilder.group({
      tema: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoa: ['', [Validators.required,Validators.max(50000)]],
      email: ['', [Validators.required,Validators.email]],
      imageURL: ['', Validators.required],
      telefone: ['', Validators.required],
    });
  }

  public resetForm(): void{
    this.formGroup.reset();
  }
}

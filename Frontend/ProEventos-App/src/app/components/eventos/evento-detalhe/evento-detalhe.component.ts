import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss'],
})
export class EventoDetalheComponent implements OnInit {
  formGroup!: FormGroup;
  evento = {} as Evento;
  estadoSalvar = 'post';

  constructor(
    private formBuilder: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.carregarEvento();
    localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.validation();
  }

  get form(): any {
    return this.formGroup.controls;
  }

  public validation(): void {
    this.formGroup = this.formBuilder.group({
      tema: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoa: ['', [Validators.required, Validators.max(50000)]],
      email: ['', [Validators.required, Validators.email]],
      imageURL: ['', Validators.required],
      telefone: ['', Validators.required],
    });
  }

  public resetForm(): void {
    this.formGroup.reset();
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY HH:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false,
    };
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');
    if (eventoIdParam !== null) {
      this.estadoSalvar = 'put';
      this.spinner.show();
      this.eventoService.getEventoById(+eventoIdParam).subscribe(
        (evento: Evento) => {
          this.evento = { ...evento };
          this.formGroup.patchValue(this.evento);
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao tentar carregar evento!', 'Erro!');
          console.error(error);
        },
        () => this.spinner.hide()
      );
    }
  }

  public salvarAlteracao(): void {
    this.spinner.show();
    if (this.estadoSalvar === 'post') {
      this.evento = { ...this.formGroup.value };
      this.eventoService.addEvento(this.evento).subscribe(
        () => {
          this.toastr.success('Evento salvo com sucesso!', 'Sucesso!');
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Aconteceu algum erro ao salvar o evento! Verifique novamente os campos do formulário', 'Erro!');
          console.error(error);
        },
        () => this.spinner.hide()
      );

    } else {
      this.evento = { id: this.evento.id, ...this.formGroup.value };
      this.eventoService.editarEvento(this.evento).subscribe(
        () => {
          this.toastr.success('Evento salvo com sucesso!', 'Sucesso!');
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Aconteceu algum erro ao salvar o evento! Verifique novamente os campos do formulário', 'Erro!');
          console.error(error);
        },
        () => this.spinner.hide()
      );
    }


  }
}

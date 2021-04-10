import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {
  public modalRef?: BsModalRef;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public imgWidth = 150;
  public imgMargin = 2;
  public isExpanded = true;
  public filtroListado = '';
  public temaEvento = '';
  public eventoId = 0;

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.spinner.show();
    this.carregarEventos();
  }

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroLista(value: string) {
    this.filtroListado = value;
    this.eventosFiltrados = this.filtroLista
      ? this.filtrarEventos(this.filtroLista)
      : this.eventos;
  }
  public filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string }) =>
        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  public toggleIsExpanded(isExpanded: boolean): void {
    this.isExpanded = !isExpanded;
  }

  public carregarEventos(): void {
    this.eventoService.carregarEventos().subscribe({
      next: (eventosResp: Evento[]) => {
        this.eventos = eventosResp;
        this.eventosFiltrados = this.eventos;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os eventos!', 'Erro!');
      },
      complete: () => this.spinner.hide()
    });
  }
  openModal(event: any, template: TemplateRef<any>, temaEvento: string, eventoId: number): void {
    event.stopPropagation();
    this.temaEvento = temaEvento;
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef!.hide();
    this.spinner.show();

    this.eventoService.deleteEvento(this.eventoId).subscribe(
      (result: any) => {
        console.log(result);
        if(result.message === 'Deletado'){
          this.toastr.success('O evento foi deletado com sucesso!', 'Evento deletado!');
          this.spinner.hide();
          this.carregarEventos();
        }
      },
      (error: any) => {
        console.error(error);
        this.toastr.error(`Erro ao tentar deletar o evento ${this.eventoId}`,'Erro');
        this.spinner.hide();
      },
      () => this.spinner.hide(),
      );
  }

  decline(): void {
    this.modalRef!.hide();
  }

  public goTodetalheEvento(id: number): void {
    this.router.navigate([`eventos/detalhe/${id}`]);
  }
}

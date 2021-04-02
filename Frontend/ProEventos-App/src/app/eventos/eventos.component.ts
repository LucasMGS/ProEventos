import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
  eventos: any = [];
  imgWidth = 150;
  imgMargin = 2;
  isExpanded = true;
  _filtroLista: string = '';
  public eventosFiltrados: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEventos();
  }
  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista
      ? this.filtrarEventos(this.filtroLista)
      : this.eventos;
  }
  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local:string; }) =>
        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  public toggleIsExpanded(isExpanded: boolean): void {
    this.isExpanded = !isExpanded;
  }

  public getEventos(): void {
    this.http.get('https://localhost:5001/api/Eventos').subscribe(
      (response) => {
        this.eventos = response;
        this.eventosFiltrados = this.eventos;
      },
      (error) => console.log(error)
    );
  }
}

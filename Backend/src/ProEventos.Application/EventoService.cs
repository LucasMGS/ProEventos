using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application
{
     public class EventoService : IEventoService
     {
          private readonly IGeralPersistence _geralPersist;
          private readonly IEventoPersistence _eventoPersist;
          private readonly IMapper _mapper;
          public EventoService(IGeralPersistence geralPersist,
                               IEventoPersistence eventoPersist,
                               IMapper mapper)
          {
               _eventoPersist = eventoPersist;
               _geralPersist = geralPersist;
               _mapper = mapper;
          }
     public async Task<EventoDto> Add(EventoDto model)
     {
          try
          {
               var evento = _mapper.Map<Evento>(model);

               _geralPersist.Add<Evento>(evento);
               if (await _geralPersist.SaveChangesAsync())
               {
                    var eventoRetorno = await _eventoPersist.GetEventoByIdAsync(evento.Id, false);
                    return _mapper.Map<EventoDto>(eventoRetorno);
               }
               return null;
          }
          catch (Exception ex)
          {
               throw new Exception(ex.Message);
          }
     }

     public async Task<EventoDto> Update(int eventoId, EventoDto model)
     {
          try
          {
               var evento = await _eventoPersist.GetEventoByIdAsync(eventoId, false);
               if (evento == null) return null;

               model.Id = evento.Id;

               _mapper.Map(model,evento);

               _geralPersist.Update<Evento>(evento);
               if (await _geralPersist.SaveChangesAsync())
               {
                    var eventoRetorno = await _eventoPersist.GetEventoByIdAsync(evento.Id, false);
                    return _mapper.Map<EventoDto>(eventoRetorno);
               }
               return null;
          }
          catch (Exception ex)
          {
               throw new Exception(ex.Message);
          }
     }

     public async Task<bool> Delete(int eventoId)
     {
          try
          {
               var evento = await _eventoPersist.GetEventoByIdAsync(eventoId, false);
               if (evento == null) throw new Exception("O evento para o delete não foi encontrado");

               _geralPersist.Delete<Evento>(evento);
               return await _geralPersist.SaveChangesAsync();

          }
          catch (Exception ex)
          {
               throw new Exception(ex.Message);
          }
     }

     public async Task<EventoDto[]> GetAllEventosAsync(bool includePalestrantes = false)
     {
          try
          {
               var eventos = await _eventoPersist.GetAllEventosAsync(includePalestrantes);
               if (eventos == null) return null;
               var eventosDto = new List<EventoDto>();

               var eventoDto = _mapper.Map<EventoDto[]>(eventos);
               return eventoDto;
          }
          catch (Exception ex)
          {
               throw new Exception(ex.Message);
          }
     }

     public async Task<EventoDto[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
     {
          try
          {
               var eventos = await _eventoPersist.GetAllEventosByTemaAsync(tema, includePalestrantes);
               if (eventos == null) return null;

               var eventoDto = _mapper.Map<EventoDto[]>(eventos);
               return eventoDto;
          }
          catch (Exception ex)
          {
               throw new Exception(ex.Message);
          }
     }

     public async Task<EventoDto> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false)
     {
          try
          {
               var evento = await _eventoPersist.GetEventoByIdAsync(eventoId, includePalestrantes);
               if (evento == null) return null;

               var eventoDto = _mapper.Map<EventoDto>(evento);
               return eventoDto;
          }
          catch (Exception ex)
          {
               throw new Exception(ex.Message);
          }
     }


}
}
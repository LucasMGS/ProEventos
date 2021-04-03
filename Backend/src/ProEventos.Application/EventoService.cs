using System;
using System.Threading.Tasks;
using ProEventos.Application.Contratos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application
{
     public class EventoService : IEventoService
     {
          private readonly IGeralPersistence _geralPersist;
          private readonly IEventoPersistence _eventoPersist;
          public EventoService(IGeralPersistence geralPersist, IEventoPersistence eventoPersist)
          {
               _eventoPersist = eventoPersist;
               _geralPersist = geralPersist;
          }
          public async Task<Evento> Add(Evento model)
          {
               try
               {
                    _geralPersist.Add<Evento>(model);
                    if (await _geralPersist.SaveChangesAsync())
                    {
                         return await _eventoPersist.GetEventoByIdAsync(model.Id, false);
                    }
                    return null;
               }
               catch (Exception ex)
               {
                    throw new Exception(ex.Message);
               }
          }

          public async Task<Evento> Update(int eventoId, Evento model)
          {
               try
               {
                    var evento = await _eventoPersist.GetEventoByIdAsync(eventoId, false);
                    if (evento == null) return null;

                    model.Id = evento.Id;

                    _geralPersist.Update(model);
                    if (await _geralPersist.SaveChangesAsync())
                    {
                         return await _eventoPersist.GetEventoByIdAsync(model.Id, false);
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

          public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false)
          {
               try
               {
                    var eventos = await _eventoPersist.GetAllEventosAsync(includePalestrantes);
                    if (eventos == null) return null;

                    return eventos;
               }
               catch (Exception ex)
               {
                    throw new Exception(ex.Message);
               }
          }

          public async Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
          {
               try
               {
                    var eventos = await _eventoPersist.GetAllEventosByTemaAsync(tema, includePalestrantes);
                    if (eventos == null) return null;

                    return eventos;
               }
               catch (Exception ex)
               {
                    throw new Exception(ex.Message);
               }
          }

          public async Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false)
          {
               try
               {
                    var evento = await _eventoPersist.GetEventoByIdAsync(eventoId, includePalestrantes);
                    if (evento == null) return null;

                    return evento;
               }
               catch (Exception ex)
               {
                    throw new Exception(ex.Message);
               }
          }


     }
}
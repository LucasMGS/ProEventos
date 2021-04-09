using System.Threading.Tasks;
using ProEventos.Application.Dtos;

namespace ProEventos.Application.Contratos
{
     public interface IEventoService
     {
          Task<EventoDto> Add(EventoDto model);
          Task<EventoDto> Update(int eventoId, EventoDto model);
          Task<bool> Delete(int eventoId);
          Task<EventoDto[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false);
          Task<EventoDto[]> GetAllEventosAsync(bool includePalestrantes = false);
          Task<EventoDto> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false);
     }
}
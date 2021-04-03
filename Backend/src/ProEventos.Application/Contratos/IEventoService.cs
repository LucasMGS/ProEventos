using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Application.Contratos
{
     public interface IEventoService
     {
          Task<Evento> Add(Evento model);
          Task<Evento> Update(int eventoId, Evento model);
          Task<bool> Delete(int eventoId);

          Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false);
          Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false);
          Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false);
     }
}
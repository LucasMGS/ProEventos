using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ProEventos.API.Controllers
{
     [ApiController]
     [Route("[controller]")]
     public class EventoController : ControllerBase
     {
         public IEnumerable<Evento> _evento = new Evento[]{
             new Evento(){
                 EventoId = 1,
                 ImageURL = "photo.png",
                 DataEvento = DateTime.Now.AddDays(2).ToString("dd/MM/yyyy"),
                 Local = "Goiânia",
                 Lote = "1º Lote",
                 QtdPessoa = 5,
                 Tema = "Angular 11 e .NET 5",
             },
             new Evento(){
                 EventoId = 2,
                 Tema = "Angular 11 e suas novidades",
                 ImageURL = "photo1.png",
                 DataEvento = DateTime.Now.AddDays(3).ToString("dd/MM/yyyy"),
                 Local = "São paulo",
                 Lote = "2º Lote",
                 QtdPessoa = 5,
             },

         };
          [HttpGet("{id}")]
          public IEnumerable<Evento> Get(int id)
          {
            return _evento.Where(evento => evento.EventoId == id);
          }
          [HttpPost]
          public IEnumerable<Evento> Post()
          {
            return _evento;
          }
          [HttpPut("{id}")]
          public IEnumerable<Evento> Put(int id)
          {
            return _evento;
          }
          [HttpDelete("{id}")]
          public IEnumerable<Evento> Delete(int id)
          {
            return _evento;
          }
          
     }
}

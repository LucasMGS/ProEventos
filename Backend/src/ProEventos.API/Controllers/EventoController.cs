using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ProEventos.API.Data;

namespace ProEventos.API.Controllers
{
     [ApiController]
     [Route("[controller]")]
     public class EventoController : ControllerBase
     {
          private readonly DataContext _context;

          public EventoController(DataContext context)
          {
            _context = context;
          }

          [HttpGet()]
          public IEnumerable<Evento> Get()
          {
               return _context.Eventos;
          }

          [HttpGet("{id}")]
          public Evento Get(int id)
          {
               return _context.Eventos.FirstOrDefault(evento => evento.EventoId == id);
          }
          [HttpPost]
          public IEnumerable<Evento> Post()
          {
               return _context.Eventos;
          }
          [HttpPut("{id}")]
          public IEnumerable<Evento> Put(int id)
          {
               return _context.Eventos;
          }
          [HttpDelete("{id}")]
          public IEnumerable<Evento> Delete(int id)
          {
               return _context.Eventos;
          }

     }
}

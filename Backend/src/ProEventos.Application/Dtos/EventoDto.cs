using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }

        [Required]
        public string Local { get; set; }

        [Required]
        public string DataEvento { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório"),
        StringLength(50,MinimumLength = 5, ErrorMessage = "O {0} deve conter entre 5 e 50 caracteres")]
        public string Tema { get; set; }

        [Display(Name="Qtd Pessoas")]
        [Range(1,50000, ErrorMessage="{0} não pode ser menor que 1 e menor que 50.000")]
        public int QtdPessoa { get; set; }

        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$",ErrorMessage="Não é uma imagem válida. (gif,jpg, jpeg, bmp ou png)")]
        public string ImageURL { get; set; }

        [Required(ErrorMessage="O campo {0} é obrigatório")]
        [Phone(ErrorMessage="O campo {0} está com número inválido")]
        public string Telefone { get; set; }
        [Display(Name="e-mail")]
        [Required]
        [EmailAddress(ErrorMessage="É necessário ser um {0} válido")]
        public string Email { get; set; }
        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedeSociais { get; set; }
        public IEnumerable<PalestranteDto> Palestrantes { get; set; }
    }
}
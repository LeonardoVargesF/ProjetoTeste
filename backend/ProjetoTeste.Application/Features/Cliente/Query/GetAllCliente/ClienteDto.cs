using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoTeste.Application.Features.Cliente.Query.GetAllCliente
{
    public class ClienteDto
    {
        public required int Id { get; set; }
        public required int Codigo { get; set; }
        public required string Nome { get; set; }
        public required string Fantasia { get; set; }
        public required string Documento { get; set; }
        public required string Endereco { get; set; }
    }
}

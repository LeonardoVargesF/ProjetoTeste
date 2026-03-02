using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoTeste.Application.Features.Cliente.Command.UpdateCliente
{
    public class UpdateClienteCommand : IRequest<Unit>
    {
        public int Id { get; set; }
        public  int Codigo { get; set; }
        public  string? Nome { get; set; }
        public  string? Fantasia { get; set; }
        public  string? Documento { get; set; }
        public  string? Endereco { get; set; }
    }
}

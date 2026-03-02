using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoTeste.Application.Features.Cliente.Command.DeleteCliente
{
    public class DeleteClienteCommand : IRequest<Unit>
    {
        public int Id { get; set; }
    }
}

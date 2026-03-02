using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoTeste.Application.Features.Cliente.Query.GetAllCliente
{
    public class GetClienteQuery : IRequest<List<ClienteDto>>
    {
    }
}

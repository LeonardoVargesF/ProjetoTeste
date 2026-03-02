using MediatR;
using ProjetoTeste.Application.Features.Cliente.Query.GetAllCliente;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoTeste.Application.Features.Cliente.Query.GetAllClienteDetails
{
    public record GetClienteDetailsQuery(int Id) : IRequest<ClienteDetailsDto>
    {
    }
}

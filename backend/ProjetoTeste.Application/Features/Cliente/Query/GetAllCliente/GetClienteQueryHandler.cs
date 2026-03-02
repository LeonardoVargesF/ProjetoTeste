using AutoMapper;
using MediatR;
using ProjetoTeste.Application.Interfaces.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoTeste.Application.Features.Cliente.Query.GetAllCliente
{
    public class GetClienteQueryHandler : IRequestHandler<GetClienteQuery, List<ClienteDto>>
    {
        private readonly IMapper _mapper;
        private readonly IClienteRepository _clienteRepository;

        public GetClienteQueryHandler(IMapper mapper, IClienteRepository clienteRepository)
        {
            this._mapper = mapper;
            this._clienteRepository = clienteRepository;
        }
        public async Task<List<ClienteDto>> Handle(GetClienteQuery request, CancellationToken cancellationToken)
        {
            var clientes = await _clienteRepository.GetAsync();

            var data = _mapper.Map<List<ClienteDto>>(clientes);

            return data;
        }
    }
}

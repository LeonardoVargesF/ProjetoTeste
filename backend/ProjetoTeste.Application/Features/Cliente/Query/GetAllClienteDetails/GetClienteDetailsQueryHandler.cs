using AutoMapper;
using MediatR;
using ProjetoTeste.Application.Exceptions;
using ProjetoTeste.Application.Interfaces.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Teste.Domain;

namespace ProjetoTeste.Application.Features.Cliente.Query.GetAllClienteDetails
{
    public class GetClienteDetailsQueryHandler : IRequestHandler<GetClienteDetailsQuery, ClienteDetailsDto>
    {
        private readonly IMapper _mapper;
        private readonly IClienteRepository _clienteRepository;

        public GetClienteDetailsQueryHandler(IMapper mapper, IClienteRepository clienteRepository)
        {
            this._mapper = mapper;
            this._clienteRepository = clienteRepository;
        }
        public async Task<ClienteDetailsDto> Handle(GetClienteDetailsQuery request, CancellationToken cancellationToken)
        {
            var cliente = await _clienteRepository.GetByIdAsync(request.Id);
            
            if (cliente == null)
            {
                throw new NotFoundException(nameof(Cliente), request.Id);
            }

            var data = _mapper.Map<ClienteDetailsDto>(cliente);

            return data;
        }
    }
}

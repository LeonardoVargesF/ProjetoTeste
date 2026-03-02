using AutoMapper;
using MediatR;
using ProjetoTeste.Application.Interfaces.Persistence;
using ProjetoTeste.Application.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoTeste.Application.Features.Cliente.Command.CreateCliente
{
    public class CreateClienteCommandHandler : IRequestHandler<CreateClienteCommand, int>
    {
        private readonly IMapper _mapper;
        private readonly IClienteRepository _clienteRepository;

        public CreateClienteCommandHandler(IMapper mapper, IClienteRepository clienteRepository)
        {
            this._mapper = mapper;
            this._clienteRepository = clienteRepository;
        }
        public async Task<int> Handle(CreateClienteCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateClienteCommandValidator(_clienteRepository);
            var validationResult = await validator.ValidateAsync(request);

            if (!validationResult.IsValid)
            {
                throw new BadRequestException("Cliente Inválido", validationResult);
            }

            var clienteToCreate = _mapper.Map<Teste.Domain.Cliente>(request);

            await _clienteRepository.CreateAsync(clienteToCreate);

            return clienteToCreate.Id;
        }
    }
}

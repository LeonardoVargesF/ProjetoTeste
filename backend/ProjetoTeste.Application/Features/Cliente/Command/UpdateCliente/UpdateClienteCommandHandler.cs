using AutoMapper;
using MediatR;
using ProjetoTeste.Application.Interfaces.Persistence;
using ProjetoTeste.Application.Exceptions;
using ProjetoTeste.Application.Features.Produto.Commands.UpdateProduto;
using ProjetoTeste.Application.Interfaces.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoTeste.Application.Features.Cliente.Command.UpdateCliente
{
    public class UpdateClienteCommandHandler : IRequestHandler<UpdateClienteCommand, Unit>
    {
        private readonly IMapper _mapper;
        private readonly IClienteRepository _clienteRepository;

        public UpdateClienteCommandHandler(IMapper mapper, IClienteRepository clienteRepository)
        {
            this._mapper = mapper;
            this._clienteRepository = clienteRepository;
        }
        public async Task<Unit> Handle(UpdateClienteCommand request, CancellationToken cancellationToken)
        {
            var validator = new UpdateClienteCommandValidator(_clienteRepository);
            var validationResult = await validator.ValidateAsync(request);

            if (!validationResult.IsValid)
            {
                throw new BadRequestException("Cliente Inválido", validationResult);
            }

            var clienteToUpdate = _mapper.Map<Teste.Domain.Cliente>(request);

            await _clienteRepository.UpdateAsync(clienteToUpdate);

            return Unit.Value;
        }
    }
}

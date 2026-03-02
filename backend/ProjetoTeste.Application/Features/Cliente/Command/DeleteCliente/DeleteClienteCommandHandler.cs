using MediatR;
using ProjetoTeste.Application.Interfaces.Persistence;
using ProjetoTeste.Application.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoTeste.Application.Features.Cliente.Command.DeleteCliente
{
    public class DeleteClienteCommandHandler : IRequestHandler<DeleteClienteCommand, Unit>
    {
        private readonly IClienteRepository _clienteRepository;

        public DeleteClienteCommandHandler(IClienteRepository clienteRepository)
        {
            this._clienteRepository = clienteRepository;
        }
        public async Task<Unit> Handle(DeleteClienteCommand request, CancellationToken cancellationToken)
        {
            var clienteToDelete = await _clienteRepository.GetByIdAsync(request.Id);

            if (clienteToDelete == null)
            {
                throw new NotFoundException(nameof(Cliente), request.Id);
            }

            await _clienteRepository.DeleteAsync(clienteToDelete);

            return Unit.Value;
        }
    }
}

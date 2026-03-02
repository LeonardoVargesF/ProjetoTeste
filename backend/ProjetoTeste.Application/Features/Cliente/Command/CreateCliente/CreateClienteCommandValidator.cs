using FluentValidation;
using ProjetoTeste.Application.Interfaces.Persistence;
using ProjetoTeste.Application.Features.Cliente.Command.CreateCliente;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoTeste.Application.Features.Cliente.Command.CreateCliente
{
    public class CreateClienteCommandValidator : AbstractValidator<CreateClienteCommand>
    {
        private readonly IClienteRepository _clienteRepository;
        public CreateClienteCommandValidator(IClienteRepository clienteRepository)
        {
            RuleFor(p => p.Codigo)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull();

            RuleFor(p => p.Nome)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull()
                .MaximumLength(60).WithMessage("Deve ser menor que 60 caracteres");

            RuleFor(p => p.Fantasia)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull()
                .MaximumLength(100).WithMessage("Deve ser menor que 100 caracteres");

            RuleFor(p => p.Documento)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull();

            RuleFor(p => p.Endereco)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull();
            RuleFor(q => q)
                .MustAsync(ClienteCodigoUnique)
                .WithMessage("Este codigo já existe");
            RuleFor(q => q)
                .MustAsync(ClienteDocumentoUnique)
                .WithMessage("Este Documento já existe");

            this._clienteRepository = clienteRepository;
        }
        private async Task<bool> ClienteCodigoUnique(CreateClienteCommand command, CancellationToken token)
        {
            return await _clienteRepository.IsCodigoUnique(command.Codigo);
        }

        private async Task<bool> ClienteDocumentoUnique(CreateClienteCommand command, CancellationToken token)
        {
            return await _clienteRepository.IsDocumentoUnique(command.Documento);
        }
    }
}

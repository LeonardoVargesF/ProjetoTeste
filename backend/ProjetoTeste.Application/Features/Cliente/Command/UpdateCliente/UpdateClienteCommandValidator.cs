using FluentValidation;
using ProjetoTeste.Application.Features.Cliente.Command.CreateCliente;
using ProjetoTeste.Application.Interfaces.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoTeste.Application.Features.Cliente.Command.UpdateCliente;
public class UpdateClienteCommandValidator : AbstractValidator<UpdateClienteCommand>
{
    private readonly IClienteRepository _clienteRepository;
    public UpdateClienteCommandValidator(IClienteRepository clienteRepository)
    {
        RuleFor(p => p.Id)
                .NotNull();
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
    private async Task<bool> ClienteCodigoUnique(UpdateClienteCommand command, CancellationToken token)
    {
        return await _clienteRepository.IsCodigoUnique(command.Id,command.Codigo);
    }

    private async Task<bool> ClienteDocumentoUnique(UpdateClienteCommand command, CancellationToken token)
    {
        return await _clienteRepository.IsDocumentoUnique(command.Id, command.Documento);
    }
}

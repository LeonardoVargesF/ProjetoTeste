using FluentValidation;
using ProjetoTeste.Application.Interfaces.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoTeste.Application.Features.Produto.Commands.UpdateProduto
{
    public class UpdateProdutoCommandValidator : AbstractValidator<UpdateProdutoCommand>
    {
        private readonly IProdutoRepository _produtoRepository;

        public UpdateProdutoCommandValidator(IProdutoRepository produtoRepository)
        {

            RuleFor(p => p.Id)
                .NotNull()
                .MustAsync(ProdutoMustExist);
            RuleFor(p => p.Codigo)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull();

            RuleFor(p => p.Descricao)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull()
                .MaximumLength(60).WithMessage("Deve ser menor que 60 caracteres");

            RuleFor(p => p.CodBarras)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull()
                .MaximumLength(14).WithMessage("Deve ser menor que 14 caracteres");

            RuleFor(p => p.ValorVenda)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull();

            RuleFor(p => p.PesoBruto)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull();

            RuleFor(p => p.PesoLiquido)
                .NotEmpty().WithMessage("{PropertyName} is required")
                .NotNull();
            RuleFor(q => q)
                .MustAsync(ProdutoCodigoUnique)
                .WithMessage("Este codigo já existe");
            RuleFor(q => q)
                .MustAsync(ProdutoCodBarrasUnique)
                .WithMessage("Este codigo de barras já existe");

            this._produtoRepository = produtoRepository;
        }


        private async Task<bool> ProdutoMustExist(int id, CancellationToken arg2)
        {
            var produto = await _produtoRepository.GetByIdAsync(id);
            return produto != null;
        }
        private async Task<bool> ProdutoCodBarrasUnique(UpdateProdutoCommand command, CancellationToken token)
        {
            return await _produtoRepository.IsCodBarrasUnique(command.CodBarras);
        }

        private async Task<bool> ProdutoCodigoUnique(UpdateProdutoCommand command, CancellationToken token)
        {
            return await _produtoRepository.IsCodigoUnique(command.Codigo);
        }
    }
}

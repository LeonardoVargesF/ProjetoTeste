using AutoMapper;
using MediatR;
using ProjetoTeste.Application.Interfaces.Persistence;
using ProjetoTeste.Application.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoTeste.Application.Features.Produto.Commands.DeleteProduto
{
    public class DeleteProdutoCommandHandler : IRequestHandler<DeleteProdutoCommand, Unit>
    {
        private readonly IProdutoRepository _produtoRepository;

        public DeleteProdutoCommandHandler(IProdutoRepository produtoRepository)
        {
            this._produtoRepository = produtoRepository;
        }
        public async Task<Unit> Handle(DeleteProdutoCommand request, CancellationToken cancellationToken)
        {
            var produtoToDelete = await _produtoRepository.GetByIdAsync(request.Id);

            if (produtoToDelete == null)
            {
                throw new NotFoundException(nameof(Produto), request.Id);
            }

            await _produtoRepository.DeleteAsync(produtoToDelete);

            return Unit.Value;
        }
    }
}

using AutoMapper;
using MediatR;
using ProjetoTeste.Application.Interfaces.Persistence;
using ProjetoTeste.Application.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoTeste.Application.Features.Produto.Commands.CreateProduto
{
    public class CreateProdutoCommandHandler : IRequestHandler<CreateProdutoCommand, int>
    {
        private readonly IMapper _mapper;
        private readonly IProdutoRepository _produtoRepository;

        public CreateProdutoCommandHandler(IMapper mapper, IProdutoRepository produtoRepository)
        {
            this._mapper = mapper;
            this._produtoRepository = produtoRepository;
        }
        public async Task<int> Handle(CreateProdutoCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateProdutoCommandValidator(_produtoRepository);
            var validationResult = await validator.ValidateAsync(request);

            if (!validationResult.IsValid)
            {
                throw new BadRequestException("Produto Inválido", validationResult);
            }

            var produtoToCreate = _mapper.Map<Teste.Domain.Produto>(request);

            await _produtoRepository.CreateAsync(produtoToCreate);

            return produtoToCreate.Id;
        }
    }
}

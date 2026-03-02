using AutoMapper;
using FluentValidation;
using MediatR;
using ProjetoTeste.Application.Interfaces.Persistence;
using ProjetoTeste.Application.Exceptions;
using ProjetoTeste.Application.Features.Produto.Commands.CreateProduto;
using ProjetoTeste.Application.Interfaces.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Teste.Domain;

namespace ProjetoTeste.Application.Features.Produto.Commands.UpdateProduto
{
    public class UpdateProdutoCommandHandler : IRequestHandler<UpdateProdutoCommand, Unit>
    {
        private readonly IMapper _mapper;
        private readonly IProdutoRepository _produtoRepository;
        private readonly IAppLogger<UpdateProdutoCommandHandler> _logger;

        public UpdateProdutoCommandHandler(IMapper mapper, IProdutoRepository produtoRepository, IAppLogger<UpdateProdutoCommandHandler> logger)
        {
            this._mapper = mapper;
            this._produtoRepository = produtoRepository;
            this._logger = logger;
        }
        public async Task<Unit> Handle(UpdateProdutoCommand request, CancellationToken cancellationToken)
        {
            var validator = new UpdateProdutoCommandValidator(_produtoRepository);
            var validationResult = await validator.ValidateAsync(request);

            if (!validationResult.IsValid)
            {
                _logger.LogWarning("Validation errors in update request for {0} - {1}", nameof(Produto), request.Id);
                throw new BadRequestException("Produto Inválido", validationResult);
            }

            var produtoToUpdate = _mapper.Map<Teste.Domain.Produto>(request);

            await _produtoRepository.UpdateAsync(produtoToUpdate);

            return Unit.Value;
        }
    }
}

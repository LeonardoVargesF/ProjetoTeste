using AutoMapper;
using MediatR;
using ProjetoTeste.Application.Interfaces.Persistence;
using ProjetoTeste.Application.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoTeste.Application.Features.Produto.Queries.GetProdutoDetails
{
    public class GetProdutoDetailsQueryHandler : IRequestHandler<GetProdutoDetailsQuery, ProdutoDetailsDto>
    {
        private readonly IMapper _mapper;
        private readonly IProdutoRepository _produtoRepository;

        public GetProdutoDetailsQueryHandler(IMapper mapper, IProdutoRepository produtoRepository)
        {
            this._mapper = mapper;
            this._produtoRepository = produtoRepository;
        }

        public async Task<ProdutoDetailsDto> Handle(GetProdutoDetailsQuery request, CancellationToken cancellationToken)
        {
            var produto = await _produtoRepository.GetByIdAsync(request.Id);

            if (produto == null)
            {
                throw new NotFoundException(nameof(Produto), request.Id);
            }

            var data = _mapper.Map<ProdutoDetailsDto>(produto);

            return data;
        }
    }
}


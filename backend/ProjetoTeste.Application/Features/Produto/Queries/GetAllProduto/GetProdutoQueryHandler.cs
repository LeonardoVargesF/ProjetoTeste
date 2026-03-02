using AutoMapper;
using MediatR;
using Microsoft.VisualBasic;
using ProjetoTeste.Application.Interfaces.Persistence;
using ProjetoTeste.Application.Interfaces.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoTeste.Application.Features.Produto.Queries.GetAllProduto
{
    public class GetProdutoQueryHandler : IRequestHandler<GetProdutoQuery, List<ProdutoDto>>
    {
        private readonly IMapper _mapper;
        private readonly IProdutoRepository _produtoRepository;
        private readonly IAppLogger<GetProdutoQueryHandler> _logger;

        public GetProdutoQueryHandler(IMapper mapper, IProdutoRepository produtoRepository, IAppLogger<GetProdutoQueryHandler> logger)
        {
            this._mapper = mapper;
            this._produtoRepository = produtoRepository;
            this._logger = logger;
        }
        public async Task<List<ProdutoDto>> Handle(GetProdutoQuery request, CancellationToken cancellationToken)
        {
            var produtos = await _produtoRepository.GetAsync();

            var data = _mapper.Map<List<ProdutoDto>>(produtos);

            _logger.LogInformation("Produtos retornados com sucesso");

            return data;
        }
    }
}

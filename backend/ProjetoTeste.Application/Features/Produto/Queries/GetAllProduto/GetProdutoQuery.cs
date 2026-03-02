using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoTeste.Application.Features.Produto.Queries.GetAllProduto
{
    public class GetProdutoQuery : IRequest<List<ProdutoDto>>
    {

    }
}

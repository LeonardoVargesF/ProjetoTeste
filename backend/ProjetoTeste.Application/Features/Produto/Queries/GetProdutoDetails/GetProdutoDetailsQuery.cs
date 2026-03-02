using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoTeste.Application.Features.Produto.Queries.GetProdutoDetails
{
    public record GetProdutoDetailsQuery(int Id) : IRequest<ProdutoDetailsDto>;

}

using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoTeste.Application.Features.Produto.Commands.UpdateProduto
{
    public class UpdateProdutoCommand : IRequest<Unit>
    {
        public int Id { get; set; }
        public  int Codigo { get; set; }
        public  string? Descricao { get; set; }
        public  string? CodBarras { get; set; }
        public  decimal ValorVenda { get; set; }
        public  decimal PesoBruto { get; set; }
        public  decimal PesoLiquido { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoTeste.Application.Features.Produto.Queries.GetProdutoDetails
{
    public class ProdutoDetailsDto
    {
        public required int Id { get; set; }
        public required int Codigo { get; set; }
        public required string Descricao { get; set; }
        public required string CodBarras { get; set; }
        public required decimal ValorVenda { get; set; }
        public required decimal PesoBruto { get; set; }
        public required decimal PesoLiquido { get; set; }
    }
}

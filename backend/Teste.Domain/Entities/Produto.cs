using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Teste.Domain.Common;

namespace Teste.Domain
{
    public class Produto : BaseEntity
    {
        public required int Codigo { get; set; }
        public required string Descricao { get; set; }
        public required string CodBarras { get; set; }
        public required decimal ValorVenda { get; set; }
        public required decimal PesoBruto { get; set; }
        public required decimal PesoLiquido { get; set; }
    }
}

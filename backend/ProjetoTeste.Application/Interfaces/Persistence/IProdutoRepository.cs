using ProjetoTeste.Application.Interfaces.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Teste.Domain;

namespace ProjetoTeste.Application.Interfaces.Persistence
{
    public interface IProdutoRepository : IGenericRepository<Produto>
    {
        Task<bool> IsCodigoUnique(int codigo);
        Task<bool> IsCodBarrasUnique(string codBarras);
        Task<bool> IsCodigoUnique(int id, int codigo);
        Task<bool> IsCodBarrasUnique(int id, string codBarras);
        
    }
}

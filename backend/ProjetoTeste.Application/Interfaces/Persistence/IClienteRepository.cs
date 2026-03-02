using ProjetoTeste.Application.Interfaces.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Teste.Domain;

namespace ProjetoTeste.Application.Interfaces.Persistence
{
    public interface IClienteRepository : IGenericRepository<Cliente>
    {
        Task<bool> IsCodigoUnique(int codigo);
        Task<bool> IsDocumentoUnique(string codBarras);
        Task<bool> IsCodigoUnique(int id, int codigo);
        Task<bool> IsDocumentoUnique(int id, string codBarras);
    }
}

using Microsoft.EntityFrameworkCore;
using ProjetoTeste.Application.Interfaces.Persistence;
using ProjetoTeste.Persistence.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Teste.Domain;

namespace ProjetoTeste.Persistence.Repository
{
    public class ClienteRepository : GenericRepository<Cliente>, IClienteRepository
    {
        public ClienteRepository(MySqlContext context) : base(context)
        {
            
        }
        public async Task<bool> IsCodigoUnique(int codigo)
        {
            return await _context.Clientes.AnyAsync(q => q.Codigo == codigo) == false;
        }

        public async Task<bool> IsDocumentoUnique(string documento)
        {
            return await _context.Clientes.AnyAsync(q => q.Documento == documento) == false;
        }

        public async Task<bool> IsCodigoUnique(int id, int codigo)
        {
            return !await _context.Clientes.AnyAsync(x => x.Id != id && x.Codigo == codigo);
        }

        public async Task<bool> IsDocumentoUnique(int id,string documento)
        {
            return !await _context.Clientes.AnyAsync(x => x.Id != id && x.Documento == documento);
        }

        

    }
}

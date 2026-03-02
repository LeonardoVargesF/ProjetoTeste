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
    public class ProdutoRepository : GenericRepository<Produto>, IProdutoRepository
    {
        public ProdutoRepository(MySqlContext context) : base(context)
        {
            
        }

        public async Task<bool> IsCodBarrasUnique(string codBarras)
        {
            return await _context.Produtos.AnyAsync(q => q.CodBarras == codBarras) == false;
        }

        public async Task<bool> IsCodigoUnique(int codigo)
        {
            return await _context.Produtos.AnyAsync(q => q.Codigo == codigo) == false;
        }

        public async Task<bool> IsCodBarrasUnique(int id, string codBarras)
        {
            return !await _context.Produtos.AnyAsync(x => x.Id != id && x.CodBarras == codBarras);
        }

        public async Task<bool> IsCodigoUnique(int id, int codigo)
        {
            return !await _context.Produtos.AnyAsync(x => x.Id != id && x.Codigo == codigo);
        }

        
    }
}

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProjetoTeste.Identity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoTeste.Identify.DbContext
{
}
public class MySqlContextIdentify : IdentityDbContext<ApplicationUser>
{
    public MySqlContextIdentify(DbContextOptions<MySqlContextIdentify> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(typeof(MySqlContextIdentify).Assembly);
    }
}
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Teste.Domain;

namespace ProjetoTeste.Persistence.Configurations
{
    public class ProdutoConfiguration : IEntityTypeConfiguration<Produto>
    {
        public void Configure(EntityTypeBuilder<Produto> builder)
        {

            builder.Property(p => p.Descricao)
                   .HasMaxLength(60)
                   .IsRequired();

            builder.Property(p => p.CodBarras)
                   .HasMaxLength(14)
                   .IsRequired();

            builder.Property(p => p.ValorVenda)
                   .HasPrecision(18, 2)
                   .IsRequired();

            builder.Property(p => p.PesoBruto)
                   .HasPrecision(18, 3)
                   .IsRequired();

            builder.Property(p => p.PesoLiquido)
                   .HasPrecision(18, 3)
                   .IsRequired();
        }
    }
}
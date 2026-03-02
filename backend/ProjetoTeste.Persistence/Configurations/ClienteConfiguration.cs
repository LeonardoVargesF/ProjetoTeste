using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Teste.Domain;

namespace ProjetoTeste.Persistence.Configurations
{
    public class ClienteConfiguration : IEntityTypeConfiguration<Cliente>
    {
        public void Configure(EntityTypeBuilder<Cliente> builder)
        {
            builder.Property(c => c.Codigo)
                   .IsRequired();

            builder.Property(c => c.Nome)
                   .HasMaxLength(60)
                   .IsRequired();

            builder.Property(c => c.Fantasia)
                   .HasMaxLength(100)
                   .IsRequired();

            builder.Property(c => c.Documento)
                   .HasMaxLength(14)
                   .IsRequired();

            builder.Property(c => c.Endereco)
                   .IsRequired();
        }
    }
}
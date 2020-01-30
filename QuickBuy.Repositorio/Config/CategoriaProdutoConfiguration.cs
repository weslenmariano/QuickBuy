using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.ObjetoDeValor;
using System;

namespace QuickBuy.Repositorio.Config
{
    public class CategoriaProdutoConfiguration : IEntityTypeConfiguration<ProdutoCategoria>
    {
        public void Configure(EntityTypeBuilder<ProdutoCategoria> builder)
        {
            builder.HasKey(f => f.Id);

            builder
                .Property(f => f.NomeCategoria)
                .IsRequired()
                .HasMaxLength(100);

            builder
                .Property(f => f.DescricaoCategoria)
                .HasMaxLength(250);
            builder
               .Property(f => f.Ativo)
               .IsRequired()
               .HasDefaultValue(true);

            builder
               .Property(f => f.DataCadastro)
               .IsRequired()
               .HasDefaultValueSql("sysdate()");
        }
    }
}

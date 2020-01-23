using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Repositorio.Config
{
    public class ProdutoComplementoConfiguration : IEntityTypeConfiguration<ProdutoComplemento>
    {
        public void Configure(EntityTypeBuilder<ProdutoComplemento> builder)
        {
            builder.HasKey(p => p.Id);

            builder
                .Property(p => p.NomeArquivo)
                .IsRequired()
                .HasMaxLength(200);
            builder
                .Property(p => p.TipoArquivo)
                .IsRequired()
                .HasMaxLength(400);
            builder
                .Property(p => p.Ativo)
                .IsRequired();
        }
    }
}

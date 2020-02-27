using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Repositorio.Config
{
    public class ProdutoConfiguration : IEntityTypeConfiguration<Produto>
    {
        public void Configure(EntityTypeBuilder<Produto> builder)
        {
            builder.HasKey(p => p.Id);

            builder
                .Property(p => p.Nome)
                .IsRequired()
                .HasMaxLength(50);
            builder
                .Property(p => p.Descricao)
                .IsRequired()
                .HasMaxLength(400);
            builder
                .Property(p => p.Preco)
                .HasColumnType("decimal(19,4)")
                .IsRequired();

            builder
               .Property(p => p.ProdAtivo)
               .IsRequired()
               .HasDefaultValue(true);

            builder
                .Property(p => p.Tag)
                .HasMaxLength(200);

            builder
               .Property(p => p.DataCadastro);

            builder
              .Property(p => p.ProdutoCategoriaId)
              .IsRequired();
        }
    }
}

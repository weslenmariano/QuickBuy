using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Repositorio.Config
{
    public class ProdutoHistoricoConfiguration : IEntityTypeConfiguration<ProdutoHistorico>
    {
        public void Configure(EntityTypeBuilder<ProdutoHistorico> builder)
        {
            builder.Property(p => p.Id)
                .IsRequired();

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
               .Property(p => p.Ativo)
               .IsRequired()
               .HasDefaultValue(true);

            builder
                .Property(p => p.Tag)
                .HasMaxLength(200);

            builder
               .Property(p => p.DataCadastro)
               .IsRequired()
               .HasDefaultValueSql("sysdate()");

            builder
              .Property(p => p.ProdutoCategoriaId)
              .IsRequired();

            builder
              .Property(p => p.DataAcao)
              .IsRequired()
              .HasDefaultValueSql("sysdate()");
        }
    }
}

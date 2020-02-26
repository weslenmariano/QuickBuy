using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Repositorio.Config
{
    public class CategoriaHistoricoConfiguration : IEntityTypeConfiguration<CategoriaHistorico>
    {
        public void Configure(EntityTypeBuilder<CategoriaHistorico> builder)
        {
            builder.Property(f => f.Id);

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
               .HasMaxLength(1);


            builder
               .Property(f => f.DataCadastro)
               .IsRequired()
               .HasDefaultValueSql("sysdate()");

            builder
             .Property(p => p.DataAcao)
             .IsRequired()
             .HasDefaultValueSql("sysdate()");
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Repositorio.Config
{
    public class UsuarioDadosConfiguration : IEntityTypeConfiguration<UsuarioDados>
    {
        public void Configure(EntityTypeBuilder<UsuarioDados> builder)
        {
            builder.HasKey(u => u.Id);

            //builder utiliza o padrao Fluent (encadeando as chamadas por . (ponto))
            builder
                .Property(u => u.NomeCompleto)
                .IsRequired()
                .HasMaxLength(150);

            builder
                .Property(u => u.Rg)
                .IsRequired()
                .HasMaxLength(20);

            builder
                .Property(u => u.Cpf)
                .IsRequired()
                .HasMaxLength(50);

            builder
               .Property(u => u.DataNascimento)
               .IsRequired()
               .HasMaxLength(10);

            builder
                .Property(u => u.TelefoneFixo)
                .IsRequired()
                .HasMaxLength(50);

            builder
                .Property(u => u.TelefoneMovel)
                .IsRequired()
                .HasMaxLength(50);

            builder
                .Property(u => u.EnderecoResidencial)
                .IsRequired()
                .HasMaxLength(150);

            builder
                .Property(u => u.NumeroResidencial)
                .IsRequired()
                .HasMaxLength(10);

            builder
                .Property(u => u.ComplementoResidencial)
                .IsRequired()
                .HasMaxLength(250);

            builder
                .Property(u => u.CEP)
                .IsRequired()
                .HasMaxLength(10);

            builder
                .Property(u => u.Estado)
                .IsRequired()
                .HasMaxLength(3);

            builder
                .Property(u => u.Cidade)
                .IsRequired()
                .HasMaxLength(150);

           
                

        }
    }
}

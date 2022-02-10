﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using QuickBuy.Repositorio.Contexto;

namespace QuickBuy.Repositorio.Migrations
{
    [DbContext(typeof(QuickBuyContexto))]
    [Migration("20200227192655_AjusteDePreenchimentoAutomaticoData")]
    partial class AjusteDePreenchimentoAutomaticoData
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("QuickBuy.Dominio.Entidades.CategoriaHistorico", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Ativo")
                        .HasMaxLength(1);

                    b.Property<DateTime>("DataAcao");

                    b.Property<DateTime>("DataCadastro");

                    b.Property<string>("DescricaoCategoria")
                        .HasMaxLength(250);

                    b.Property<string>("NomeCategoria")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.ToTable("CategoriaHistorico");
                });

            modelBuilder.Entity("QuickBuy.Dominio.Entidades.ItemPedido", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("PedidoId");

                    b.Property<int>("ProdutoId");

                    b.Property<int>("Quantidade");

                    b.HasKey("Id");

                    b.HasIndex("PedidoId");

                    b.ToTable("ItensPedidos");
                });

            modelBuilder.Entity("QuickBuy.Dominio.Entidades.Pedido", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DataPedido");

                    b.Property<DateTime>("DataPrevisaoEntrega");

                    b.Property<int>("FormaPagamentoId");

                    b.Property<int>("UsuarioId");

                    b.HasKey("Id");

                    b.HasIndex("FormaPagamentoId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Pedidos");
                });

            modelBuilder.Entity("QuickBuy.Dominio.Entidades.Produto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DataCadastro");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasMaxLength(400);

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("NomeArquivo");

                    b.Property<decimal>("Preco")
                        .HasColumnType("decimal(19,4)");

                    b.Property<bool>("ProdAtivo")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(true);

                    b.Property<int>("ProdutoCategoriaId");

                    b.Property<string>("Tag")
                        .HasMaxLength(200);

                    b.HasKey("Id");

                    b.HasIndex("ProdutoCategoriaId");

                    b.ToTable("Produtos");
                });

            modelBuilder.Entity("QuickBuy.Dominio.Entidades.ProdutoComplemento", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Ativo");

                    b.Property<string>("NomeArquivo")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<int>("ProdutoId");

                    b.Property<string>("TipoArquivo")
                        .IsRequired()
                        .HasMaxLength(400);

                    b.HasKey("Id");

                    b.HasIndex("ProdutoId");

                    b.ToTable("ProdutoComplementos");
                });

            modelBuilder.Entity("QuickBuy.Dominio.Entidades.ProdutoHistorico", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Ativo")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(true);

                    b.Property<DateTime>("DataAcao");

                    b.Property<DateTime>("DataCadastro");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasMaxLength(400);

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("NomeArquivo");

                    b.Property<decimal>("Preco")
                        .HasColumnType("decimal(19,4)");

                    b.Property<int>("ProdutoCategoriaId");

                    b.Property<string>("Tag")
                        .HasMaxLength(200);

                    b.HasKey("Id");

                    b.ToTable("ProdutoHistorico");
                });

            modelBuilder.Entity("QuickBuy.Dominio.Entidades.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("EhAdministrador");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasMaxLength(400);

                    b.Property<string>("SobreNome")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("QuickBuy.Dominio.Entidades.UsuarioDados", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CEP")
                        .IsRequired()
                        .HasMaxLength(10);

                    b.Property<string>("Cidade")
                        .IsRequired()
                        .HasMaxLength(150);

                    b.Property<string>("ComplementoResidencial")
                        .IsRequired()
                        .HasMaxLength(250);

                    b.Property<string>("Cpf")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("DataNascimento")
                        .IsRequired()
                        .HasMaxLength(10);

                    b.Property<string>("EnderecoResidencial")
                        .IsRequired()
                        .HasMaxLength(150);

                    b.Property<string>("Estado")
                        .IsRequired()
                        .HasMaxLength(3);

                    b.Property<string>("NomeCompleto")
                        .IsRequired()
                        .HasMaxLength(150);

                    b.Property<int>("NumeroResidencial")
                        .HasMaxLength(10);

                    b.Property<string>("Rg")
                        .IsRequired()
                        .HasMaxLength(20);

                    b.Property<string>("TelefoneFixo")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("TelefoneMovel")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<int>("UsuarioId");

                    b.HasKey("Id");

                    b.HasIndex("UsuarioId");

                    b.ToTable("UsuarioDados");
                });

            modelBuilder.Entity("QuickBuy.Dominio.ObjetoDeValor.FormaPagamento", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("FormaPagamento");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Descricao = "Forma de Pagamento Boleto",
                            Nome = "Boleto"
                        },
                        new
                        {
                            Id = 2,
                            Descricao = "Forma de Pagamento Cartão de Credito",
                            Nome = "Cartão de Crédito"
                        },
                        new
                        {
                            Id = 3,
                            Descricao = "Forma de Pagamento Depósito",
                            Nome = "Depósito"
                        });
                });

            modelBuilder.Entity("QuickBuy.Dominio.ObjetoDeValor.ProdutoCategoria", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Ativo")
                        .HasMaxLength(1);

                    b.Property<DateTime>("DataCadastro");

                    b.Property<string>("DescricaoCategoria")
                        .HasMaxLength(250);

                    b.Property<string>("NomeCategoria")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.ToTable("ProdutoCategoria");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Ativo = 0,
                            DataCadastro = new DateTime(2020, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DescricaoCategoria = "Categoria1 Teste",
                            NomeCategoria = "Categoria1"
                        },
                        new
                        {
                            Id = 2,
                            Ativo = 0,
                            DataCadastro = new DateTime(2020, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DescricaoCategoria = "Categoria2 Teste",
                            NomeCategoria = "Categoria2"
                        },
                        new
                        {
                            Id = 3,
                            Ativo = 0,
                            DataCadastro = new DateTime(2020, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DescricaoCategoria = "Categoria3 Teste",
                            NomeCategoria = "Categoria3"
                        },
                        new
                        {
                            Id = 4,
                            Ativo = 0,
                            DataCadastro = new DateTime(2020, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DescricaoCategoria = "Categoria4 Teste",
                            NomeCategoria = "Categoria4"
                        });
                });

            modelBuilder.Entity("QuickBuy.Dominio.Entidades.ItemPedido", b =>
                {
                    b.HasOne("QuickBuy.Dominio.Entidades.Pedido")
                        .WithMany("ItensPedido")
                        .HasForeignKey("PedidoId");
                });

            modelBuilder.Entity("QuickBuy.Dominio.Entidades.Pedido", b =>
                {
                    b.HasOne("QuickBuy.Dominio.ObjetoDeValor.FormaPagamento", "FormaPagamento")
                        .WithMany()
                        .HasForeignKey("FormaPagamentoId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("QuickBuy.Dominio.Entidades.Usuario", "Usuario")
                        .WithMany("Pedidos")
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("QuickBuy.Dominio.Entidades.Produto", b =>
                {
                    b.HasOne("QuickBuy.Dominio.ObjetoDeValor.ProdutoCategoria", "ProdutoCategoria")
                        .WithMany()
                        .HasForeignKey("ProdutoCategoriaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("QuickBuy.Dominio.Entidades.ProdutoComplemento", b =>
                {
                    b.HasOne("QuickBuy.Dominio.Entidades.Produto", "Produto")
                        .WithMany()
                        .HasForeignKey("ProdutoId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("QuickBuy.Dominio.Entidades.UsuarioDados", b =>
                {
                    b.HasOne("QuickBuy.Dominio.Entidades.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
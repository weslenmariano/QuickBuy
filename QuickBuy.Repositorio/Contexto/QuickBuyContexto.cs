
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Dominio.ObjetoDeValor;
using QuickBuy.Repositorio.Config;
using System.Linq;

namespace QuickBuy.Repositorio.Contexto
{
    public class QuickBuyContexto : DbContext
    {

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<UsuarioDados> UsuarioDados { get; set; }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<ProdutoComplemento> ProdutoComplementos { get; set; }

        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<ItemPedido> ItensPedidos { get; set; }
        public DbSet<FormaPagamento> FormaPagamento { get; set; }
        public DbSet<ProdutoCategoria> ProdutoCategoria { get; set; }

        
        public DbSet<ProdutoHistorico> ProdutoHistorico { get; set; }


        public QuickBuyContexto(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /// classes de mapeamento aqui...
            modelBuilder.ApplyConfiguration(new UsuarioConfiguration());
            modelBuilder.ApplyConfiguration(new UsuarioDadosConfiguration());
            modelBuilder.ApplyConfiguration(new ProdutoConfiguration());
            modelBuilder.ApplyConfiguration(new ProdutoComplementoConfiguration());
            modelBuilder.ApplyConfiguration(new PedidoConfiguration());
            modelBuilder.ApplyConfiguration(new ItemPedidoConfiguration());
            modelBuilder.ApplyConfiguration(new FormaPagamentoConfiguration());
            modelBuilder.ApplyConfiguration(new CategoriaProdutoConfiguration());
            modelBuilder.ApplyConfiguration(new ProdutoHistoricoConfiguration());
            modelBuilder.ApplyConfiguration(new CategoriaHistoricoConfiguration());


            modelBuilder.Entity<FormaPagamento>().HasData(new FormaPagamento()
            {
                Id = 1,
                Nome = "Boleto",
                Descricao = "Forma de Pagamento Boleto"
            },
                                                                    new FormaPagamento()
                                                                    {
                                                                        Id = 2,
                                                                        Nome = "Cartão de Crédito",
                                                                        Descricao = "Forma de Pagamento Cartão de Credito"
                                                                    },
                                                                    new FormaPagamento()
                                                                    {
                                                                        Id = 3,
                                                                        Nome = "Depósito",
                                                                        Descricao = "Forma de Pagamento Depósito"
                                                                    }
                                                             );

            modelBuilder.Entity<ProdutoCategoria>()
                //.OnDelete(DeleteBehavior.Restrict)
                .HasData(new ProdutoCategoria()
                {
                    Id = 1,
                    NomeCategoria = "Categoria1",
                    DescricaoCategoria = "Categoria1 Teste"
                },
                                                                new ProdutoCategoria()
                                                                {
                                                                    Id = 2,
                                                                    NomeCategoria = "Categoria2",
                                                                    DescricaoCategoria = "Categoria2 Teste"
                                                                },
                                                                new ProdutoCategoria()
                                                                {
                                                                    Id = 3,
                                                                    NomeCategoria = "Categoria3",
                                                                    DescricaoCategoria = "Categoria3 Teste"
                                                                },
                                                                new ProdutoCategoria()
                                                                {
                                                                    Id = 4,
                                                                    NomeCategoria = "Categoria4",
                                                                    DescricaoCategoria = "Categoria4 Teste"
                                                                }
                                                         );
            //foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            //{
            //    relationship.DeleteBehavior = DeleteBehavior.Restrict;
            //}


            base.OnModelCreating(modelBuilder);
        }

    }
}

using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace QuickBuy.Repositorio.Migrations
{
    public partial class AddHistoricoProdutos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProdutoHistorico",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        //.Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(maxLength: 50, nullable: false),
                    Descricao = table.Column<string>(maxLength: 400, nullable: false),
                    Preco = table.Column<decimal>(type: "decimal(19,4)", nullable: false),
                    NomeArquivo = table.Column<string>(nullable: true),
                    DataCadastro = table.Column<DateTime>(nullable: true),
                    Tag = table.Column<string>(maxLength: 200, nullable: true),
                    Ativo = table.Column<bool>(nullable: false, defaultValue: true),
                    ProdutoCategoriaId = table.Column<int>(nullable: false),
                    DataAcao = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProdutoHistorico", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProdutoHistorico");
        }
    }
}

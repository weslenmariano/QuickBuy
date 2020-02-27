using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace QuickBuy.Repositorio.Migrations
{
    public partial class AddCategoriaProduto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ProdAtivo",
                table: "Produtos",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataCadastro",
                table: "Produtos",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProdutoCategoriaId",
                table: "Produtos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Tag",
                table: "Produtos",
                maxLength: 200,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ProdutoCategoria",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    NomeCategoria = table.Column<string>(maxLength: 100, nullable: false),
                    DescricaoCategoria = table.Column<string>(maxLength: 250, nullable: true),
                    Ativo = table.Column<bool>(nullable: true),
                    DataCadastro = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProdutoCategoria", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "ProdutoCategoria",
                columns: new[] { "Id", "DescricaoCategoria", "NomeCategoria","DataCadastro" },
                values: new object[] { 1, "Categoria1 Teste", "Categoria1", "2020/01/01" });

            migrationBuilder.InsertData(
                table: "ProdutoCategoria",
                columns: new[] { "Id", "DescricaoCategoria", "NomeCategoria", "DataCadastro" },
                values: new object[] { 2, "Categoria2 Teste", "Categoria2", "2020/01/01" });

            migrationBuilder.InsertData(
                table: "ProdutoCategoria",
                columns: new[] { "Id", "DescricaoCategoria", "NomeCategoria", "DataCadastro" },
                values: new object[] { 3, "Categoria3 Teste", "Categoria3", "2020/01/01" });

            migrationBuilder.InsertData(
                table: "ProdutoCategoria",
                columns: new[] { "Id", "DescricaoCategoria", "NomeCategoria", "DataCadastro" },
                values: new object[] { 4, "Categoria4 Teste", "Categoria4", "2020/01/01" });

            migrationBuilder.CreateIndex(
                name: "IX_Produtos_ProdutoCategoriaId",
                table: "Produtos",
                column: "ProdutoCategoriaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Produtos_ProdutoCategoria_ProdutoCategoriaId",
                table: "Produtos",
                column: "ProdutoCategoriaId",
                principalTable: "ProdutoCategoria",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produtos_ProdutoCategoria_ProdutoCategoriaId",
                table: "Produtos");

            migrationBuilder.DropTable(
                name: "ProdutoCategoria");

            migrationBuilder.DropIndex(
                name: "IX_Produtos_ProdutoCategoriaId",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "ProdAtivo",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "DataCadastro",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "ProdutoCategoriaId",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "Tag",
                table: "Produtos");
        }
    }
}

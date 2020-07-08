using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace QuickBuy.Repositorio.Migrations
{
    public partial class AddCategoriaHistorico : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                 name: "CategoriaHistorico",
                 columns: table => new
                 {
                     Id = table.Column<int>(nullable: false)
                         //.Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                         .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                     NomeCategoria = table.Column<string>(maxLength: 50, nullable: false),
                     DescricaoCategoria = table.Column<string>(maxLength: 400, nullable: false),
                     Ativo = table.Column<bool>(nullable: false, defaultValue: true),
                     DataCadastro = table.Column<DateTime>(nullable: true),
                     DataAcao = table.Column<DateTime>(nullable: true)
                 },
                 constraints: table =>
                 {
                     table.PrimaryKey("PK_CategoriaHistorico", x => x.Id);
                 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoriaHistorico");
        }
    }
}

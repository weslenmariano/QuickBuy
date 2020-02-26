using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace QuickBuy.Repositorio.Migrations
{
    public partial class AddHistoricoCategorias : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CategoriaHistorico",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    NomeCategoria = table.Column<string>(maxLength: 100, nullable: false),
                    DescricaoCategoria = table.Column<string>(maxLength: 250, nullable: true),
                    Ativo = table.Column<int>(maxLength: 1, nullable: false),
                    DataCadastro = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdate()"),
                    DataAcao = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdate()")
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

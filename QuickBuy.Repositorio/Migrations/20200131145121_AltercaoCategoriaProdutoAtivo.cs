using Microsoft.EntityFrameworkCore.Migrations;

namespace QuickBuy.Repositorio.Migrations
{
    public partial class AltercaoCategoriaProdutoAtivo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Ativo",
                table: "ProdutoCategoria",
                maxLength: 1,
                nullable: false,
                oldClrType: typeof(bool),
                oldDefaultValue: true);

            migrationBuilder.UpdateData(
                table: "ProdutoCategoria",
                keyColumn: "Id",
                keyValue: 1,
                column: "Ativo",
                value: 0);

            migrationBuilder.UpdateData(
                table: "ProdutoCategoria",
                keyColumn: "Id",
                keyValue: 2,
                column: "Ativo",
                value: 0);

            migrationBuilder.UpdateData(
                table: "ProdutoCategoria",
                keyColumn: "Id",
                keyValue: 3,
                column: "Ativo",
                value: 0);

            migrationBuilder.UpdateData(
                table: "ProdutoCategoria",
                keyColumn: "Id",
                keyValue: 4,
                column: "Ativo",
                value: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "Ativo",
                table: "ProdutoCategoria",
                nullable: false,
                defaultValue: true,
                oldClrType: typeof(int),
                oldMaxLength: 1);

            migrationBuilder.UpdateData(
                table: "ProdutoCategoria",
                keyColumn: "Id",
                keyValue: 1,
                column: "Ativo",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProdutoCategoria",
                keyColumn: "Id",
                keyValue: 2,
                column: "Ativo",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProdutoCategoria",
                keyColumn: "Id",
                keyValue: 3,
                column: "Ativo",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProdutoCategoria",
                keyColumn: "Id",
                keyValue: 4,
                column: "Ativo",
                value: false);
        }
    }
}

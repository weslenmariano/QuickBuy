using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace QuickBuy.Repositorio.Migrations
{
    public partial class AjusteDePreenchimentoAutomaticoData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ProdutoCategoria",
                keyColumn: "Id",
                keyValue: 1,
                column: "DataCadastro",
                value: new DateTime(2020, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "ProdutoCategoria",
                keyColumn: "Id",
                keyValue: 2,
                column: "DataCadastro",
                value: new DateTime(2020, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "ProdutoCategoria",
                keyColumn: "Id",
                keyValue: 3,
                column: "DataCadastro",
                value: new DateTime(2020, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "ProdutoCategoria",
                keyColumn: "Id",
                keyValue: 4,
                column: "DataCadastro",
                value: new DateTime(2020, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ProdutoCategoria",
                keyColumn: "Id",
                keyValue: 1,
                column: "DataCadastro",
                value: new DateTime(2020, 2, 27, 16, 21, 5, 222, DateTimeKind.Local).AddTicks(1804));

            migrationBuilder.UpdateData(
                table: "ProdutoCategoria",
                keyColumn: "Id",
                keyValue: 2,
                column: "DataCadastro",
                value: new DateTime(2020, 2, 27, 16, 21, 5, 224, DateTimeKind.Local).AddTicks(387));

            migrationBuilder.UpdateData(
                table: "ProdutoCategoria",
                keyColumn: "Id",
                keyValue: 3,
                column: "DataCadastro",
                value: new DateTime(2020, 2, 27, 16, 21, 5, 224, DateTimeKind.Local).AddTicks(397));

            migrationBuilder.UpdateData(
                table: "ProdutoCategoria",
                keyColumn: "Id",
                keyValue: 4,
                column: "DataCadastro",
                value: new DateTime(2020, 2, 27, 16, 21, 5, 224, DateTimeKind.Local).AddTicks(398));
        }
    }
}

using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace QuickBuy.Repositorio.Migrations
{
    public partial class InclusaoDadosDeUsuario : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CEP",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "Cidade",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "EnderecoCompleto",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "Estado",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "NumeroEndereco",
                table: "Pedidos");

            migrationBuilder.CreateTable(
                name: "UsuarioDados",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        //.Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UsuarioId = table.Column<int>(nullable: false),
                    NomeCompleto = table.Column<string>(maxLength: 150, nullable: false),
                    Rg = table.Column<string>(maxLength: 20, nullable: false),
                    Cpf = table.Column<string>(maxLength: 50, nullable: false),
                    TelefoneFixo = table.Column<string>(maxLength: 50, nullable: false),
                    TelefoneMovel = table.Column<string>(maxLength: 50, nullable: false),
                    EnderecoResidencial = table.Column<string>(maxLength: 150, nullable: false),
                    NumeroResidencial = table.Column<int>(maxLength: 10, nullable: false),
                    ComplementoResidencial = table.Column<string>(maxLength: 250, nullable: false),
                    CEP = table.Column<string>(maxLength: 10, nullable: false),
                    Estado = table.Column<string>(maxLength: 3, nullable: false),
                    Cidade = table.Column<string>(maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsuarioDados", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UsuarioDados_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UsuarioDados_UsuarioId",
                table: "UsuarioDados",
                column: "UsuarioId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UsuarioDados");

            migrationBuilder.AddColumn<string>(
                name: "CEP",
                table: "Pedidos",
                maxLength: 10,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Cidade",
                table: "Pedidos",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EnderecoCompleto",
                table: "Pedidos",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Estado",
                table: "Pedidos",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "NumeroEndereco",
                table: "Pedidos",
                nullable: false,
                defaultValue: 0);
        }
    }
}

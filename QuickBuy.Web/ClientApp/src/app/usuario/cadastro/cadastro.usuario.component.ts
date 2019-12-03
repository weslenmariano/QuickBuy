import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../modelo/usuario";
import { UsuarioServico } from "../../servicos/usuario/usuario.servico";


@Component({
    selector: "cadastro-usuario",
    templateUrl: "./cadastro.usuario.component.html",
    styleUrls: ["./cadastro.usuario.component.css"]
})

export class CadastroUsuarioComponent implements OnInit {

    public usuario: Usuario;
    public ativarSpinner: boolean;
    public mensagem: string;
    public usuarioCadastrado: boolean;

    constructor(private usuarioServico: UsuarioServico) {

    }

    ngOnInit(): void {
        this.usuario = new Usuario();
    }

    public cadastrar() {
        this.ativarSpinner = true;
        if (this.usuario.email == null || this.usuario.senha == null) {
            this.mensagem = "O email e senha são de preenchimento obrigatórios.";
            this.ativarSpinner = false;
            return;
        }
        // alert("Nome: " + this.usuario.nome + " Sobre Nome: " + this.usuario.sobreNome + " Email: " + this.usuario.email + " Senha: " + this.usuario.senha);
        this.usuarioServico.cadastrarUsuario(this.usuario)
            .subscribe(
                usuarioJson => {
                    this.usuarioCadastrado = true;
                    this.mensagem = "";
                    this.ativarSpinner = false;
                },
                err => {
                    this.mensagem = err.error;
                    this.ativarSpinner = false;
                }
            );
    }
}

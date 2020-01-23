import { Component, OnInit } from "@angular/core";
import { UsuarioDados } from "../../modelo/usuarioDados";
import { UsuarioDadosServico } from "../../servicos/usuario/usuarioDados.servico";
import { UsuarioServico } from "../../servicos/usuario/usuario.servico";
import { Usuario } from "../../modelo/usuario";
import { isNull } from "@angular/compiler/src/output/output_ast";
import { Router } from "@angular/router";


@Component({
    selector: "usuario-dados",
    templateUrl: "./dados.usuario.component.html",
    styleUrls: ["./dados.usuario.component.css"]
})

export class DadosUsuarioComponent implements OnInit {

    public usuarioDados: UsuarioDados;
    public usuario: Usuario;
    // public ativarSpinner: boolean;
    public mensagem: string;
    public dadosAtualizados: boolean;
    public ativarSpinner: boolean;


    //public usuarioCadastrado: boolean;

    constructor(private usuarioDadosServico: UsuarioDadosServico, private usuarioServico: UsuarioServico, private router: Router) {

    }

    ngOnInit(): void {

        this.usuario = this.usuarioServico.usuario;
        this.usuarioDados = new UsuarioDados();
        this.buscaDadosUsuario();
    }

    buscaDadosUsuario() {
        // this.ativarSpinner = true;

        this.usuarioDadosServico.obterDadosUsuario(this.usuario.email)
            .subscribe(
                usuario_json => {
                    //essa linha sera executada no caso de retorno sem erros
                    //var usuarioRetorno: Usuario;
                    // usuarioRetorno = data;
                    // sessionStorage.setItem("usuario-autenticado", "1");
                    sessionStorage.setItem('dadosUsrSession', JSON.stringify(usuario_json));
                    this.usuarioDados = usuario_json;

                    if (this.usuarioDados == null) {
                        this.usuarioDados = new UsuarioDados();
                       // alert(this.usuario.id);
                        this.usuarioDados.UsuarioId = this.usuario.id;
                    } else {
                        this.usuarioDados.UsuarioId = this.usuario.id;
                    }



                    //alert(JSON.stringify(this.usuarioDados));
                    //if (this.returnUrl == null) {
                    //    this.router.navigate(['/']);
                    //} else {
                    //    this.router.navigate([this.returnUrl]);
                    //}

                },
                err => {

                    // this.usuarioDados = new UsuarioDados();
                    console.log(err.error);
                    this.mensagem = err.error;
                    //this.ativarSpinner = false;
                }
            );




    }



    public atualizar() {
        //this.ativarEspera();

        this.usuarioDadosServico.atualizar(this.usuarioDados)
            .subscribe(
                usuarioDadosJson => {
                    console.log(usuarioDadosJson);
                    this.dadosAtualizados = true;
                    this.ativarSpinner = false;
                    //this.desativarEspera();
                    //this.router.navigate(['/pesquisar-produto']); 
                },
                err => {
                    this.mensagem = err.error;
                    this.ativarSpinner = false;
                    console.log(err.error);
                    //this.desativarEspera();
                }
            );

    }

    public voltar() {
        this.router.navigate(['/']);
    }

}

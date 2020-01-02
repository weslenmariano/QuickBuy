import { Component, OnInit } from "@angular/core";
import { UsuarioDados } from "../../modelo/usuarioDados";
import { UsuarioDadosServico } from "../../servicos/usuario/usuarioDados.servico";
import { UsuarioServico } from "../../servicos/usuario/usuario.servico";
import { Usuario } from "../../modelo/usuario";


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
    //public usuarioCadastrado: boolean;

    constructor(private usuarioDadosServico: UsuarioDadosServico, private usuarioServico: UsuarioServico) {

    }

    ngOnInit(): void {
        this.usuarioDados = new UsuarioDados();
        this.usuario = this.usuarioServico.usuario;
        this.buscaDadosUsuario();
    }

    buscaDadosUsuario() {
       // this.ativarSpinner = true;
       // alert('teste get');
      //  alert ('Email Usuario logado: '+this.usuario.email)


        this.usuarioDadosServico.obterDadosUsuario(this.usuario.email)
            .subscribe(
                usuario_json => {
                    //essa linha sera executada no caso de retorno sem erros
                    //var usuarioRetorno: Usuario;
                    // usuarioRetorno = data;
                    // sessionStorage.setItem("usuario-autenticado", "1");
                    
                    this.usuarioDados = usuario_json;
                    //if (this.returnUrl == null) {
                    //    this.router.navigate(['/']);
                    //} else {
                    //    this.router.navigate([this.returnUrl]);
                    //}

                },
                err => {
                    console.log(err.error);
                    this.mensagem = err.error;
                    //this.ativarSpinner = false;
                }
            );

    }

    public atualizar() {
        //this.ativarEspera();
        //this.produtoServico.cadastrar(this.produto)
        //    .subscribe(
        //        produtoJson => {
        //            console.log(produtoJson);
        //            this.desativarEspera();
        //            this.router.navigate(['/pesquisar-produto']);
        //        },
        //        err => {
        //            this.mensagem = err.error;
        //            console.log(err.error);
        //            this.desativarEspera();
        //        }
        //    );

    }

}

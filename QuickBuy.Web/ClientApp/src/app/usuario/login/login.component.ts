import { Component, OnInit } from "@angular/core"
import { Usuario } from "../../modelo/usuario";
import { Router, ActivatedRoute } from "@angular/router";
import { UsuarioServico } from "../../servicos/usuario/usuario.servico";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {

  public usuario;
  public returnUrl: string;
  public mensagem: string;
  private ativarSpinner: boolean;
  //    public usuarios = ["usuario1", "usuario2", "usuario3", "usuario4", "usuario5"]
  //    public usuarioAutenticado: boolean;

  constructor(private router: Router, private ativatedRouter: ActivatedRoute, private usuarioServico: UsuarioServico) {


  }

  ngOnInit(): void {
    this.returnUrl = this.ativatedRouter.snapshot.queryParams['returnUrl'];
    this.usuario = new Usuario();
  }
  //public email = "";
  //public senha = "";
  //public enderecoImagem = "https://d23stzf11uxe1a.cloudfront.net/wp-content/uploads/2019/02/22100711/buying.jpg"
  // "http://www.ciser.com.br/chefe-secreto-ciser/site/themes/chefe-secreto/public/images/loading.gif";
  //public titulo = "Titudo do componente";

  entrar() {
    this.ativarSpinner = true;
    this.usuarioServico.verificarUsuario(this.usuario)
      .subscribe(
        usuario_json => {
          //essa linha sera executada no caso de retorno sem erros
          //var usuarioRetorno: Usuario;
          // usuarioRetorno = data;
          // sessionStorage.setItem("usuario-autenticado", "1");

          this.usuarioServico.usuario = usuario_json;

          if (this.returnUrl == null) {
            this.router.navigate(['/']);
          } else {
            this.router.navigate([this.returnUrl]);
          }

        },
        err => {
          console.log(err.error);
          this.mensagem = err.error;
          this.ativarSpinner = false;
        }
      );

  }


}

import { Component } from "@angular/core"
import { Usuario } from "../../modelo/usuario";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls:["./login.component.css"]
})

export class LoginComponent {
    public usuario;
    public usuarioAutenticado: boolean;

    public usuarios = ["usuario1", "usuario2", "usuario3", "usuario4", "usuario5"]
    constructor() {
        this.usuario = new Usuario();
    }
    //public email = "";
    //public senha = "";
    //public enderecoImagem = "https://d23stzf11uxe1a.cloudfront.net/wp-content/uploads/2019/02/22100711/buying.jpg"
    // "http://www.ciser.com.br/chefe-secreto-ciser/site/themes/chefe-secreto/public/images/loading.gif";
    //public titulo = "Titudo do componente";

    entrar() {
        if (this.usuario.email == "teste@teste.com" && this.usuario.senha == "1234") {
            this.usuarioAutenticado = true;
        }
        //alert('Entrar no sistema.');
    }

  
}

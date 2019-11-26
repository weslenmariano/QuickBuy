import { Component, OnInit } from "@angular/core"
import { Usuario } from "../../modelo/usuario";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls:["./login.component.css"]
})

export class LoginComponent implements OnInit {
   
    public usuario;
    public returnUrl: string;
//    public usuarios = ["usuario1", "usuario2", "usuario3", "usuario4", "usuario5"]
//    public usuarioAutenticado: boolean;

    constructor(private router: Router, private ativatedRouter: ActivatedRoute) {
        
        
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
        if (this.usuario.email == "teste@teste.com.br" && this.usuario.senha == "1234") {
           // this.usuarioAutenticado = true;
            sessionStorage.setItem("usuario-autenticado", "1");
            this.router.navigate([this.returnUrl]);
        }
        //alert('Entrar no sistema.');
    }

  
}

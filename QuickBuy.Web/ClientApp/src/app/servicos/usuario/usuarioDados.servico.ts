import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { UsuarioDados } from "../../modelo/usuarioDados";

@Injectable({
    providedIn: "root"
})
export class UsuarioDadosServico {

    private baseURL: string
    private _dadosUsuario: UsuarioDados;


    set usuarioDados(dadosUsuario: UsuarioDados) {
        sessionStorage.setItem("dados-usuario", JSON.stringify(dadosUsuario));
        this._dadosUsuario = dadosUsuario;
    }

    get usuarioDados(): UsuarioDados {
        let dadosUsuario_json = sessionStorage.getItem("dados-usuario");
        this._dadosUsuario = JSON.parse(dadosUsuario_json);
        return this._dadosUsuario;
    }

    public limpar_sessao() {
        sessionStorage.setItem("dadosUsrSession", "");
        this._dadosUsuario = null;
    }


    get headers(): HttpHeaders {
        return new HttpHeaders().set('content-type', 'application/json');
    }

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseURL = baseUrl;
    }

    //public verificarUsuario(usuario: Usuario): Observable<Usuario> {

    //    //const headers = new HttpHeaders().set('content-type', 'application/json');
    //    //var body = {
    //    //    email: usuario.email,
    //    //    senha: usuario.senha
    //    //}

    //    // this.baseURL = raiz do site que pode ser exemplo.: http://www.quickbuy.com.br
    //    return this.http.post<Usuario>(this.baseURL + "api/usuario/VerificarUsuario", JSON.stringify(usuario), { headers: this.headers });
    //}

    public obterDadosUsuario(usuarioEmail: string): Observable<UsuarioDados> {
        //// Initialize Params Object
        //let params = new HttpParams();

        //// Begin assigning parameters
        //params = params.append('firstParameter', parameters.valueOne);
        //params = params.append('secondParameter', parameters.valueTwo);

        let params = new HttpParams().set('email', usuarioEmail);
        return this.http.get<UsuarioDados>(this.baseURL + "api/usuarioDados", { params: params });
    }

    public atualizar(usuarioDados: UsuarioDados): Observable<UsuarioDados> {

        return this.http.post<UsuarioDados>(this.baseURL + "api/usuarioDados", JSON.stringify(usuarioDados), { headers: this.headers });
    }

    
}

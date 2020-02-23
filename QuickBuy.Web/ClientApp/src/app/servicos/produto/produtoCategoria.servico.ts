import { Injectable, Inject, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProdutoCategoria } from "../../modelo/produtoCategoria";

@Injectable({
    providedIn: "root"
})

export class ProdutoCategoriaServico implements OnInit {


    private _baseUrl: string;
    public produtoCategoria: ProdutoCategoria[];

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    ngOnInit(): void {
        this.produtoCategoria = [];
    }


    get headers(): HttpHeaders {
        return new HttpHeaders().set('content-type', 'application/json');
    }



    public cadastrar(produtoCategoria: ProdutoCategoria): Observable<ProdutoCategoria> {

        return this.http.post<ProdutoCategoria>(this._baseUrl + "api/produtoCategoria", JSON.stringify(produtoCategoria), { headers: this.headers });
    }

    public salvar(produtoCategoria: ProdutoCategoria): Observable<ProdutoCategoria> {

        return this.http.post<ProdutoCategoria>(this._baseUrl + "api/produtoCategoria/salvar", JSON.stringify(produtoCategoria), { headers: this.headers });
    }

    public deletar(produtoCategoria: ProdutoCategoria): Observable<ProdutoCategoria[]> {
        // boa pratica
        return this.http.post<ProdutoCategoria[]>(this._baseUrl + "api/produtoCategoria/deletar", JSON.stringify(produtoCategoria), { headers: this.headers });
    }

    public obterTodosCategorias(): Observable<ProdutoCategoria[]> {

        return this.http.get<ProdutoCategoria[]>(this._baseUrl + "api/produtoCategoria");
    }

    public obterCategoria(categoriaId: number): Observable<ProdutoCategoria> {

        return this.http.get<ProdutoCategoria>(this._baseUrl + "api/produtoCategoria/obter");
    }

    public atualizar(produtoCategoria: ProdutoCategoria): Observable<ProdutoCategoria> {

        return this.http.post<ProdutoCategoria>(this._baseUrl + "api/produtoCategoria", JSON.stringify(produtoCategoria), { headers: this.headers });
    }
}

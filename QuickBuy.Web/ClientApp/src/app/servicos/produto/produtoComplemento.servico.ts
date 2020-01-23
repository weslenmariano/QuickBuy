import { Injectable, Inject, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProdutoComplemento } from "../../modelo/produtoComplemento";

@Injectable({
    providedIn: "root"
})

export class ProdutoComplementoServico implements OnInit {


    private _baseUrl: string;
    public produtoComplemento: ProdutoComplemento[];

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    ngOnInit(): void {
        this.produtoComplemento = [];
    }


    get headers(): HttpHeaders {
        return new HttpHeaders().set('content-type', 'application/json');
    }




    public cadastrarComplemento(produtoComplemento: ProdutoComplemento): Observable<ProdutoComplemento> {

        return this.http.post<ProdutoComplemento>(this._baseUrl + "api/produtoComplemento", JSON.stringify(produtoComplemento), { headers: this.headers });
    }

    public salvar(produtoComplemento: ProdutoComplemento): Observable<ProdutoComplemento> {

        return this.http.post<ProdutoComplemento>(this._baseUrl + "api/produtoComplemento/salvar", JSON.stringify(produtoComplemento), { headers: this.headers });
    }

    public deletar(produtoComplemento: ProdutoComplemento): Observable<ProdutoComplemento[]> {

        // boa pratica
        return this.http.post<ProdutoComplemento[]>(this._baseUrl + "api/produtoComplemento/deletar", JSON.stringify(produtoComplemento), { headers: this.headers });

        // maneira mais suja, com mais codigos
        /*
        const headers = new HttpHeaders().set('content-type', 'application/json');
        var body = {
          nome: produto.nome,
          descricao: produto.descricao,
          preco: produto.preco
        }
    
        return this.http.post<Produto>(this._baseUrl + "api/produto/deletar", body, { headers });
        */
    }

    public obterTodosComplementos(): Observable<ProdutoComplemento[]> {

        return this.http.get<ProdutoComplemento[]>(this._baseUrl + "api/produtoComplemento");
    }

    public obterProduto(produtoId: number): Observable<ProdutoComplemento> {

        return this.http.get<ProdutoComplemento>(this._baseUrl + "api/produtoComplemento/obter");
    }

    public enviarArquivo(arquivoSelecionado: File): Observable<string> {
        const formData: FormData = new FormData();
        formData.append("arquivoEnviado", arquivoSelecionado, arquivoSelecionado.name);
        return this.http.post<string>(this._baseUrl + "api/produtoComplemento/enviarArquivo", formData)
    }

    public deletarArquivos(produtoComplemento: ProdutoComplemento): Observable<ProdutoComplemento[]> {

        // boa pratica
        return this.http.post<ProdutoComplemento[]>(this._baseUrl + "api/produtoComplemento/deletarArquivos", JSON.stringify(produtoComplemento), { headers: this.headers });

    }
}

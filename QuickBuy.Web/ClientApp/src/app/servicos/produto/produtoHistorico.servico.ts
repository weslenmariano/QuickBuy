import { Injectable, Inject, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProdutoHistorico } from "../../modelo/produtoHistorico";

@Injectable({
  providedIn: "root"
})

export class ProdutoHistoricoServico implements OnInit {


  private _baseUrl: string;
  public produtos: ProdutoHistorico[];

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.produtos = [];
  }


  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }


  public cadastrar(produto: ProdutoHistorico): Observable<ProdutoHistorico> {
    //alert("Chamada da API");
    return this.http.post<ProdutoHistorico>(this._baseUrl + "api/produtoHistorico", JSON.stringify(produto), { headers: this.headers });
  }


  public salvar(produto: ProdutoHistorico): Observable<ProdutoHistorico> {

    return this.http.post<ProdutoHistorico>(this._baseUrl + "api/produtoHistorico/salvar", JSON.stringify(produto), { headers: this.headers });
  }

  public deletar(produto: ProdutoHistorico): Observable<ProdutoHistorico[]> {

    // boa pratica
    return this.http.post<ProdutoHistorico[]>(this._baseUrl + "api/produtoHistorico/deletar", JSON.stringify(produto), { headers: this.headers });

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

  public obterTodosProdutos(): Observable<ProdutoHistorico[]> {

    return this.http.get<ProdutoHistorico[]>(this._baseUrl + "api/produtoHistorico");
  }

  public obterProduto(produtoId: number): Observable<ProdutoHistorico> {
    // alert("obter produto Id:" + produtoId)
    return this.http.post<ProdutoHistorico>(this._baseUrl + "api/produtoHistorico/obter", JSON.stringify(produtoId), { headers: this.headers });
  }


}

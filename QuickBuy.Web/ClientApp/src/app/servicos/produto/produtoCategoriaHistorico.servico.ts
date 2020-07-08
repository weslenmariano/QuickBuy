import { Injectable, Inject, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProdutoCategoriaHistorico } from "../../modelo/produtoCategoriaHistorico";

@Injectable({
  providedIn: "root"
})


export class ProdutoCategoriaHistoricoServico implements OnInit {

  private _baseUrl: string;
  public controller: string = "categoriaHistorico"; // CategoriaHistoricoController;
  public categorias: ProdutoCategoriaHistorico[];

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.categorias = [];
  }


  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }



  public cadastrar(categoriaHist: ProdutoCategoriaHistorico): Observable<ProdutoCategoriaHistorico> {
    //alert("Chamada da API");
    return this.http.post<ProdutoCategoriaHistorico>(this._baseUrl + "api/"+this.controller, JSON.stringify(categoriaHist), { headers: this.headers });
  }


  public salvar(categoriaHist: ProdutoCategoriaHistorico): Observable<ProdutoCategoriaHistorico> {

    return this.http.post<ProdutoCategoriaHistorico>(this._baseUrl + "api/"+this.controller+"/salvar", JSON.stringify(categoriaHist), { headers: this.headers });
  }

  public deletar(categoriaHist: ProdutoCategoriaHistorico): Observable<ProdutoCategoriaHistorico[]> {

    // boa pratica
    return this.http.post<ProdutoCategoriaHistorico[]>(this._baseUrl + "api/"+this.controller+"/deletar", JSON.stringify(categoriaHist), { headers: this.headers });

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

  public obterTodosCategorias(): Observable<ProdutoCategoriaHistorico[]> {

    return this.http.get<ProdutoCategoriaHistorico[]>(this._baseUrl + "api/"+this.controller);
  }

  public obterCategoria(categoriaHistId: number): Observable<ProdutoCategoriaHistorico> {
    // alert("obter produto Id:" + produtoId)
    return this.http.post<ProdutoCategoriaHistorico>(this._baseUrl + "api/"+this.controller+"/obter", JSON.stringify(categoriaHistId), { headers: this.headers });
  }


}

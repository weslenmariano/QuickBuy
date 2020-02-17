import { Component, OnInit } from "@angular/core"
import { ProdutoCategoriaServico } from "../../servicos/produto/produtoCategoria.servico";
import { ProdutoCategoria } from "../../modelo/produtoCategoria";
import { Router } from "@angular/router";


@Component({
    selector: "categoria-produto", // qual tag html que o component produto sera renderizado
    templateUrl: "./categoria.component.html", //pagina que sera renderizada na pagina
    styleUrls: ["./categoria.component.css"] // arquio de stilo que sera utilizado na pagina renderizada
})
export class CategoriaComponent implements OnInit {
   
    public categoria: ProdutoCategoria;
    public mensagem: string;
    public ativarSpinner: boolean;

    constructor(private produtoCategoriaServico: ProdutoCategoriaServico, private router: Router) {

    }

    ngOnInit(): void {

        var produtoCategoriaSession = sessionStorage.getItem('produtoCategoriaSession');

        if (produtoCategoriaSession != "") {
            //RECUPERANDO DADOS DO PRODUTO DA SESSAO
            this.categoria = JSON.parse(produtoCategoriaSession);
        }
        else {
            this.categoria = new ProdutoCategoria();
            this.categoria.ativo = 1;
        }
    }

    public checkAtivo(e) {
        if (e.target.checked) {
            this.categoria.ativo = 1;
        } else {
            this.categoria.ativo = 0;
        }
        
    }

    public cadastrar() {
        console.log(JSON.stringify(this.categoria));
        this.ativarSpinner = true;
        this.produtoCategoriaServico.cadastrar(this.categoria)
            .subscribe(
                categoriaJson => {
                    console.log(categoriaJson);
                    this.LimparSessao();
                    this.router.navigate(['../pesquisa-categoria']);
                },
                err => {
                    this.mensagem = err.error;
                    console.log(err.error);
                    this.ativarSpinner = false;
                }
        );

        
    }

    public LimparSessao() {
        sessionStorage.setItem('produtoCategoriaSession', "");
    }

  

}

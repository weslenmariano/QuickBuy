import { Component, OnInit } from "@angular/core"
import { templateJitUrl } from "@angular/compiler";
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { Produto } from "../../modelo/produto";
import { Router } from "@angular/router";

@Component({
    selector: "app-loja",
    templateUrl: "./loja.pesquisa.component.html",
    styleUrls: ["./loja.pesquisa.component.css"]
})

export class LojaPesquisaComponent implements OnInit{

    public produtos: Produto[];

    ngOnInit(): void {
    
    }

    constructor(private produtoServico: ProdutoServico, private router:Router) {
        this.produtoServico.obterTodosProdutos()
            .subscribe(
                produtos => {
                    this.produtos = produtos;

                },
                erro => {
                    console.log(erro.error);
                }
            )
        
    }

    public abrirProduto(produto: Produto) {
       // alert(produto.nome);
        sessionStorage.setItem('produtoDetalhe', JSON.stringify(produto));
        this.router.navigate(['/loja-produto'])

    }

}

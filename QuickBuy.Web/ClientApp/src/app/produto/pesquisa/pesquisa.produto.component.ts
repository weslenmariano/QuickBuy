import { Component, OnInit } from "@angular/core";
import { Produto } from "../../modelo/produto";
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { Router } from "@angular/router";

@Component({
    selector: "pesquisar-produto",
    templateUrl: "./pesquisa.produto.component.html",
    styleUrls: ["./pesquisa.produto.component.css"]

})

export class PesquisaProdutoComponent implements OnInit {

    public produtos: Produto[];

    ngOnInit(): void {
        
    }

    constructor(private produtoServico: ProdutoServico, private router: Router) {
        this.produtoServico.obterTodosProdutos().subscribe(
            produtos => {
                this.produtos = produtos;
            },
            erro => {
                console.log(erro.error);
            }
        )
    }

    public adicionarProduto() {
        this.router.navigate(['/produto']);
    }

    public deletarProduto(produto: Produto) {
        var retorno = confirm("Deseja realmente deletar o produto selecionado?");
        if (retorno == true) {
            this.produtoServico.deletar(produto).subscribe(
                produtos => {
                    this.produtos = produtos;
                },
                erro => {
                    console.log(erro.error);
                }
            )
        }
        
    }
}

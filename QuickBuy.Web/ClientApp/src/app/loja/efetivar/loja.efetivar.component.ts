import { Component, OnInit } from "@angular/core";
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { LojaCarrinhoCompras } from "../carrinho-compras/loja.carrinho.compras.component";
import { Produto } from "../../modelo/produto";

@Component({
    selector: "loja-efetivar",
    templateUrl: "./loja.efetivar.component.html",
    styleUrls: ["./loja.efetivar.component.css"]
})

export class LojaEfetivarComponent implements OnInit {
    public carrinhoCompras: LojaCarrinhoCompras;
    public produtos: Produto[];

    ngOnInit(): void {
        this.carrinhoCompras = new LojaCarrinhoCompras();
        this.produtos = this.carrinhoCompras.obterProdutos();
    }

    constructor(private produtoServico: ProdutoServico) {

    }

    public atualizarPreco(produto: Produto, quantidade: number) {
        if (!produto.precoOriginal) {
            produto.precoOriginal = produto.preco;
        }
        produto.preco = produto.precoOriginal * quantidade;
        


    }

}

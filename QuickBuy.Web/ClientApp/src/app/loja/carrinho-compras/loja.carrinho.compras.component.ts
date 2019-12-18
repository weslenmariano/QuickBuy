import { Produto } from "../../modelo/produto";
import { Router } from "@angular/router";

export class LojaCarrinhoCompras {
    
    public produtos: Produto[] = []; // a declaracao ja esta inicializando a lista.

    constructor() {

    }
    public adicionar(produto: Produto) {
        var produtoLocalStorage = localStorage.getItem("produtoLocalStorage");

        if (!produtoLocalStorage) {
            this.produtos.push(produto);
            
        } else {
            this.produtos = JSON.parse(produtoLocalStorage);
            this.produtos.push(produto);
            
        }
        localStorage.setItem("produtoLocalStorage", JSON.stringify(this.produtos));

    }

    public obterProdutos(): Produto[] {
        var produtoLocalStorage = localStorage.getItem("produtoLocalStorage");
        if (produtoLocalStorage) {
            return JSON.parse(produtoLocalStorage);
        }

        return this.produtos;
    }

    public removerProduto(produto: Produto) {
        var produtoLocalStorage = localStorage.getItem("produtoLocalStorage");
        if (produtoLocalStorage) {
            this.produtos = JSON.parse(produtoLocalStorage);
            this.produtos = this.produtos.filter(p => p.id != produto.id);
            localStorage.setItem("produtoLocalStorage", JSON.stringify(this.produtos));
        }
       
        
    }

    public atualizar(produtos: Produto[]) {
        localStorage.setItem("produtoLocalStorage", JSON.stringify(produtos));
    }

    public temItensCarrinhoCompras() {
        var itens = this.obterProdutos();
        
        return (itens.length > 0);
    }

    public limparCarrinhoCompras() {
        localStorage.setItem("produtoLocalStorage","");        
    }

}

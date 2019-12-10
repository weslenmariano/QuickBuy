import { Produto } from "../../modelo/produto";

export class LojaCarrinhoCompras {
    public produtos: Produto[] = []; // a declaracao ja esta inicializando a lista.

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
    }

    public removerProduto(produto: Produto) {

    }

}

import { Component, OnInit } from "@angular/core";
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { LojaCarrinhoCompras } from "../carrinho-compras/loja.carrinho.compras.component";
import { Produto } from "../../modelo/produto";
import { Router } from "@angular/router";
import { Pedido } from "../../modelo/pedido";
import { UsuarioServico } from "../../servicos/usuario/usuario.servico";
import { ItemPedido } from "../../modelo/itemPedido";

@Component({
    selector: "loja-efetivar",
    templateUrl: "./loja.efetivar.component.html",
    styleUrls: ["./loja.efetivar.component.css"]
})

export class LojaEfetivarComponent implements OnInit {
    public carrinhoCompras: LojaCarrinhoCompras;
    public produtos: Produto[];
    public total: number;

    ngOnInit(): void {
        this.carrinhoCompras = new LojaCarrinhoCompras();
        this.produtos = this.carrinhoCompras.obterProdutos();
        this.atualizarTotal();
    }

    constructor(private produtoServico: ProdutoServico, private router: Router, private usuarioServico: UsuarioServico) {

    }

    public atualizarPreco(produto: Produto, quantidade: number) {
        if (!produto.precoOriginal) {
            produto.precoOriginal = produto.preco;
        }
        if (quantidade <= 0) {
            quantidade = 1;
            produto.quantidade = quantidade;
        }
        produto.preco = produto.precoOriginal * quantidade;
        this.carrinhoCompras.atualizar(this.produtos);
        this.atualizarTotal();
        
 


    }

    public remover(produto: Produto) {
        this.carrinhoCompras.removerProduto(produto);
        this.produtos = this.carrinhoCompras.obterProdutos();
        this.atualizarTotal();
        if (!this.carrinhoCompras.temItensCarrinhoCompras()) {
            this.router.navigate(['/']);
        }
    }

    public atualizarTotal() {
        // reduce percorre toda a lista, item a item.
        // acc variavel acumuladora
        // produto variavel a ser usada como lambda
        // acc + produto.preco ---- é feito a somatorio do anterior total + o item atual.
        // 0 é o indice que sera iniciado a leitura da lista
        this.total = this.produtos.reduce((acc, produto) => acc + produto.preco, 0);
    }

    public efetivarCompra() {
        let pedido = this.criarPedido();


    }

    public criarPedido(): Pedido {
        let pedido = new Pedido();
        pedido.usuarioId = this.usuarioServico.usuario.id;
        pedido.cep = "123456789";
        pedido.cidade = "Sao Paulo";
        pedido.estado = "Sao Paulo";
        pedido.dataPrevisaoEntrega = new Date();
        pedido.formaPagamentoId = 1;
        pedido.numeroEndereco = "12";

        this.produtos = this.carrinhoCompras.obterProdutos();
        for (let produto of this.produtos) {
            let itemPedido = new ItemPedido();
            itemPedido.produtoId = produto.id;
            if (!produto.quantidade) {
                produto.quantidade = 1;
            }
            itemPedido.quantidade = produto.quantidade;

            pedido.itensPedido.push(itemPedido);
        }

        return pedido;
    }

}

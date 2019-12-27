import { Component, OnInit } from "@angular/core";
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { Produto } from "../../modelo/produto";
import { Router } from "@angular/router";
import { LojaCarrinhoCompras } from "../carrinho-compras/loja.carrinho.compras.component";
import { UsuarioServico } from "../../servicos/usuario/usuario.servico";

@Component({
    selector: "loja-app-produto",
    templateUrl: "./loja.produto.component.html",
    styleUrls: ["./loja.produto.component.css"]
})

export class LojaProdutoComponent implements OnInit {

    public produto: Produto;
    public carrinhoCompras: LojaCarrinhoCompras;

    ngOnInit(): void {
        this.carrinhoCompras = new LojaCarrinhoCompras();
        var produtoDetalhe = sessionStorage.getItem('produtoDetalhe');
        if (produtoDetalhe) {
            this.produto = JSON.parse(produtoDetalhe);
        }

    }

    constructor(private produtoServico: ProdutoServico, private router: Router, private usuarioServico: UsuarioServico) {

    }

    public comprar() {

        this.produto.usuarioId = this.usuarioServico.usuario.id;
        //alert("USUARIO ID DA SESSAO: "+this.produto.usuarioId)
        this.carrinhoCompras.adicionar(this.produto);
        this.router.navigate(["/loja-efetivar"]);
    }
}

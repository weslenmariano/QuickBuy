import { Component, OnInit } from "@angular/core";
import { Produto } from "../../modelo/produto";
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { Router } from "@angular/router";
import { ProdutoComplemento } from "../../modelo/produtoComplemento";
import { ProdutoComplementoServico } from "../../servicos/produto/produtoComplemento.servico";
import { Popup } from 'ng2-opd-popup';

@Component({
    selector: "pesquisar-produto",
    templateUrl: "./pesquisa.produto.component.html",
    styleUrls: ["./pesquisa.produto.component.css"]

})

export class PesquisaProdutoComponent implements OnInit {

    public produtos: Produto[];
    public produtosComplemento: ProdutoComplemento[];
    public produtoDeletar: Produto;
    ngOnInit(): void {
        
    }

    constructor(private popup: Popup, private produtoServico: ProdutoServico, private produtoComplemento: ProdutoComplementoServico, private router: Router) {
        this.produtoServico.obterTodosProdutos().subscribe(
            produtos => {
                this.produtos = produtos;
            },
            erro => {
                console.log(erro.error);
            }
        )

        this.produtoComplemento.obterTodosComplementos().subscribe(
            produtosComp => {
                this.produtosComplemento = produtosComp;
            },
            erro => {
                console.log(erro.error);
            }
        )
    }

    public adicionarProduto() {
        sessionStorage.setItem('produtoSession',"");
        this.router.navigate(['/produto']);
    }

    public setadeletarProduto(produto: Produto) {
        //alert("setadeletarProduto");
        this.produtoDeletar = produto;
    }

    public deletarProduto(produto: Produto) {
        
        this.popup.options = {
            header: "Confirmação de Exclusão",
            color: "#DF0101", // red, blue....
            //widthProsentage: 30, // The with of the popou measured by browser width
            animationDuration: 1, // in seconds, 0 = no animation
            showButtons: false, // You can hide this in case you want to use custom buttons
            //confirmBtnContent: "Deletar", // The text on your confirm button
            //cancleBtnContent: "Cancelar", // the text on your cancel button
            //confirmBtnClass: "btn btn-danger ", // your class for styling the confirm button
            //cancleBtnClass: "btn btn-primary margin-right: 3px;",
            animation: "bounceIn" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
        };

        
        this.produtoDeletar = produto;
        this.popup.show(this.popup.options);

    }

    public DeletarConfirmado() {
        if (this.produtoDeletar) {
            this.produtoServico.deletar(this.produtoDeletar).subscribe(
                produtos => {
                    this.produtos = produtos;
                },
                erro => {
                    console.log(erro.error);
                }
            )
        }
        this.popup.hide();
    }

    public DeletarCancelado() {
        this.popup.hide();
    }

    public editarProduto(produto: Produto) {

        this.produtosComplemento = this.produtosComplemento.filter(pc => pc.produtoId == produto.id);


        //alert(JSON.stringify(produto));
       // alert(JSON.stringify(this.produtosComplemento));

        console.log(JSON.stringify(produto))
        console.log(JSON.stringify(this.produtosComplemento));

        sessionStorage.setItem('produtoSession', JSON.stringify(produto));
        sessionStorage.setItem('produtoComplementoSession', JSON.stringify(this.produtosComplemento));
        this.router.navigate(['/produto']);
        
    }




}

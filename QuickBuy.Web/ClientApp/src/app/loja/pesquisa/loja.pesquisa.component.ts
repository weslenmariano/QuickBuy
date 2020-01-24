import { Component, OnInit } from "@angular/core"
import { templateJitUrl } from "@angular/compiler";
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { Produto } from "../../modelo/produto";
import { Router } from "@angular/router";
import { trigger, transition, style, sequence, animate } from '@angular/animations';

@Component({
    selector: "app-loja",
    templateUrl: "./loja.pesquisa.component.html",
    styleUrls: ["./loja.pesquisa.component.css"],
    // fade para paginacao dos produtos
    animations: [
        trigger('anim', [
            transition('void => *', [
                style({ opacity: '0.1', transform: 'translateY(5px)' }), // movimento de baixo para cima com deslocamento de 5px
                //style({ opacity: '0.1', transform: 'translateX(50px)' }), // movimento da direita para esquerda comdeslocamento de 50px
                sequence([
                    animate('3s ease', style({ opacity: '1', transform: 'translateY(0px)' })),
                    //animate('0.5s ease', style({ opacity: '1', transform: 'translateY(50px)' })),
                    //animate('0.5s ease', style({ opacity: '1', transform: 'translateX(-50px)' })),
                    //animate('0.5s ease', style({ opacity: '1', transform: 'translateY(-50px)' })),
                    //animate('0.5s ease', style({ opacity: '1', transform: 'translateX(50px)' })),
                    //animate('0.5s ease', style({ opacity: '1', transform: 'translateX(0px)' })),
                ])
            ])
        ])
    ]
})

export class LojaPesquisaComponent implements OnInit{

    public produtos: Produto[];
    pag: number = 1;
    contador: number = 6; 

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
       // alert(produto.nomeArquivo);
        
        sessionStorage.setItem('produtoDetalhe', JSON.stringify(produto));
        this.router.navigate(['/loja-produto'])

    }

}

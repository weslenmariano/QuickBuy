import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioServico } from '../servicos/usuario/usuario.servico';
import { LojaCarrinhoCompras } from '../loja/carrinho-compras/loja.carrinho.compras.component';
import { UsuarioDadosServico } from '../servicos/usuario/usuarioDados.servico';
import { trigger, transition, style, sequence, animate } from '@angular/animations';
import { ProdutoServico } from '../servicos/produto/produto.servico';
import { LojaPesquisaComponent } from '../loja/pesquisa/loja.pesquisa.component';
import { PesquisaProdutoComponent } from '../produto/pesquisa/pesquisa.produto.component';
import { ProdutoComplementoServico } from '../servicos/produto/produtoComplemento.servico';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css'],
    // fade 
    animations: [
        trigger('anim', [
            transition('void => *', [
                style({ opacity: '0.1', transform: 'translateY(-15px)' }), // movimento de baixo para cima com deslocamento de 5px
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
export class NavMenuComponent implements OnInit {

    isExpanded = false;
    public carrinhoCompras: LojaCarrinhoCompras;
    public lojaPesquisaComponent: LojaPesquisaComponent;
    public filtrar: boolean;


    ngOnInit(): void {
        this.carrinhoCompras = new LojaCarrinhoCompras();
        this.lojaPesquisaComponent = new LojaPesquisaComponent(this.produtoServico, this.router);
        sessionStorage.setItem('produtoFiltrar', "N");

    }

    constructor(private router: Router, private usuarioServico: UsuarioServico, private usuarioDadosServico: UsuarioDadosServico, private produtoServico: ProdutoServico, private produtoComplementoServico: ProdutoComplementoServico) {

    }
    collapse() {
        this.isExpanded = false;
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }

    public usuarioLogado(): boolean {
        return this.usuarioServico.usuario_autenticado();
    }

    public usuarioAdministrador(): boolean {
        return this.usuarioServico.usuario_administrador();
    }

    meusDados() {
        if(this.usuarioLogado())
        this.router.navigate(['/usuario-dados/']);
    }



    sair() {
        this.usuarioServico.limpar_sessao();
        this.usuarioDadosServico.limpar_sessao();
        this.router.navigate(['/']);
    }

    get usuario() {
        return this.usuarioServico.usuario;
    }

    public temItensCarrinhoCompras(): boolean {
        return this.usuarioLogado() && this.carrinhoCompras.temItensCarrinhoCompras(this.usuarioServico.usuario.id);

    }

   
}

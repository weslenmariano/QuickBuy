import { Component, OnInit } from "@angular/core";
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { Produto } from "../../modelo/produto";
import { Router } from "@angular/router";
import { LojaCarrinhoCompras } from "../carrinho-compras/loja.carrinho.compras.component";
import { UsuarioServico } from "../../servicos/usuario/usuario.servico";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
    selector: "loja-app-produto",
    templateUrl: "./loja.produto.component.html",
    styleUrls: ["./loja.produto.component.css"]
})

export class LojaProdutoComponent implements OnInit {

    public produto: Produto;
    public carrinhoCompras: LojaCarrinhoCompras;
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    ngOnInit(): void {

            this.galleryOptions = [
                {
                    width: '600px',
                    height: '400px',
                    thumbnailsColumns: 4,
                   // imageAnimation: NgxGalleryAnimation.Slide,
                   // imageAutoPlay: true,
                    imageAutoPlayPauseOnHover: true,
                    previewAutoPlayPauseOnHover: true,
                    previewCloseOnEsc: true,
                    previewZoom: true,
                    
                    //thumbnailsRemainingCount: true,
                    imageAutoPlayInterval: 7000,
                    //icones setas
                    arrowPrevIcon: "fa fa-arrow-circle-o-left",
                    arrowNextIcon: "fa fa-arrow-circle-o-right",
                    closeIcon: "fa fa-window-close",
                    fullscreenIcon: "fa fa-arrows",
                    spinnerIcon: "fa fa-refresh fa-spin fa-3x fa-fw",
                  
                    previewZoomStep: 0.5,
                    previewZoomMax: 4,
                    previewRotate: true,
                  
                    
                    
                },
                // max-width 800
                {
                    breakpoint: 800,
                    width: '100%',
                    height: '600px',
                    imagePercent: 80,
                    thumbnailsPercent: 20,
                    thumbnailsMargin: 20,
                    thumbnailMargin: 20
                },
                // max-width 400
                {
                    breakpoint: 400,
                    preview: false
                }
            ];
        var pathArquivos = "../../../../../arquivos/";
        var array = [];
        for (var i = 0; i <= 3; i++) {
            array.push({ "small": pathArquivos + i + ".jpg", "medium": pathArquivos + i + ".jpg", "big": pathArquivos+ i + ".jpg" });
        } 
        
        this.galleryImages = array;
            //this.galleryImages = [
            //    {
            //        small: '../../../../../arquivos/galaxy_2019121521164.jpg',
            //        medium: '../../../../../arquivos/galaxy_2019121521164.jpg',
            //        big: '../../../../../arquivos/galaxy_2019121521164.jpg'
            //    },
            //    {
            //        small: 'assets/img/quick-logo.jpg',
            //        medium: 'assets/img/quick-logo.jpg',
            //        big: 'assets/img/quick-logo.jpg'
            //    },
            //    {
            //        small: 'assets/img/log-in.png',
            //        medium: 'assets/img/log-in.png',
            //        big: 'assets/img/log-in.png'
            //    },
        
            //];
        
        this.carrinhoCompras = new LojaCarrinhoCompras();
        var produtoDetalhe = sessionStorage.getItem('produtoDetalhe');
        if (produtoDetalhe) {
            this.produto = JSON.parse(produtoDetalhe);
        }

    }

    constructor(private produtoServico: ProdutoServico, private router: Router, private usuarioServico: UsuarioServico) {

    }

    public comprar() {
         if (this.usuarioServico.usuario_autenticado()) {
            this.produto.usuarioId = this.usuarioServico.usuario.id;
            this.carrinhoCompras.adicionar(this.produto);
        }
        //alert("USUARIO ID DA SESSAO: "+this.produto.usuarioId)
        
        this.router.navigate(["/loja-efetivar"]);
    }
}

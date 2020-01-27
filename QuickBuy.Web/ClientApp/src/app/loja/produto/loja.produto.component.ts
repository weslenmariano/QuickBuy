import { Component, OnInit } from "@angular/core";
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { Produto } from "../../modelo/produto";
import { Router } from "@angular/router";
import { LojaCarrinhoCompras } from "../carrinho-compras/loja.carrinho.compras.component";
import { UsuarioServico } from "../../servicos/usuario/usuario.servico";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ProdutoComplementoServico } from "../../servicos/produto/produtoComplemento.servico";
import { ProdutoComplemento } from "../../modelo/produtoComplemento";

@Component({
    selector: "loja-app-produto",
    templateUrl: "./loja.produto.component.html",
    styleUrls: ["./loja.produto.component.css"]
})

export class LojaProdutoComponent implements OnInit {

    public produto: Produto;
    public carrinhoCompras: LojaCarrinhoCompras;
    public item: string[] = [];
    public produtosComplemento: ProdutoComplemento[];

    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];



    constructor(private produtoServico: ProdutoServico, private router: Router, private usuarioServico: UsuarioServico, private produtoComplementoServico: ProdutoComplementoServico) {

    }

    ngOnInit(): void {
            this.galleryOptions = [
                {
                    width: '100%',
                    height: '100%',
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
                    height: '100%',
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
  
        this.carrinhoCompras = new LojaCarrinhoCompras();
        var produtoDetalhe = sessionStorage.getItem('produtoDetalhe');
        
        if (produtoDetalhe) {
            this.produto = JSON.parse(produtoDetalhe);
            this.item = [];
            this.produtoComplementoServico.obterTodosComplementos().subscribe(
                produtosComp => {
                    this.produtosComplemento = produtosComp;
                    this.produtosComplemento = this.produtosComplemento.filter(pc => pc.produtoId == this.produto.id);
                    this.item.push(this.produto.nomeArquivo);
                    for (var i = 0; i < this.produtosComplemento.length; i++) {
                        this.item.push(this.produtosComplemento[i].nomeArquivo);
                    }
                    this.criarGaleria(this.item);
                },
                erro => {
                    console.log(erro.error);
                }
            )
            //this.item = [];
            //if (this.edicaoProduto && this.arquivosDeletarGaleria.length > 0) { this.DeletaImagemGaleria = true };
            //for (var i = 0; i < files.length; i++) {

            //    this.arquivoSelecionado = files.item(i);

            //    this.produtoComplementoServico.enviarArquivo(this.arquivoSelecionado)
            //        .subscribe(
            //            nomeArquivo => {
            //                this.ativarEsperaGaleria();
            //                this.item.push(nomeArquivo);
            //                this.criarGaleria(this.item);
            //                // console.log("Desativou Spinner");
            //            },
            //            erro => {
            //                console.log(erro.error);
            //            }
            //        );

            //}



            
        }

    }


    


    public criarGaleria(item: string[]) {
        // alert("Chamada Criar Galeria para exibir as imagens selecionadas");
        //this.exibirGaleria = true;
        //this.ativarEsperaGaleria();

        var pathArquivos = "../../../../../arquivos/";
        var array = [];

        //alert(item.length);
        if (item.length >= 1) {
            //alert("populando Array das imagens a serem exibidas na tela");
            for (var i = 0; i < item.length; i++) {
                array.push({ "small": pathArquivos + item[i], "medium": pathArquivos + item[i], "big": pathArquivos + item[i] });
            }
        } else {
            //alert("Exibir galeria false");
           // this.exibirGaleria = false;
        }

        this.galleryImages = array;
        
       // this.desativarEsperaGaleria();
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

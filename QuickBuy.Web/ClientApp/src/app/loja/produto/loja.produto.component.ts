import { Component, OnInit } from "@angular/core";
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { Produto } from "../../modelo/produto";
import { Router } from "@angular/router";
import { LojaCarrinhoCompras } from "../carrinho-compras/loja.carrinho.compras.component";
import { UsuarioServico } from "../../servicos/usuario/usuario.servico";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ProdutoComplementoServico } from "../../servicos/produto/produtoComplemento.servico";
import { ProdutoComplemento } from "../../modelo/produtoComplemento";
import { trigger, transition, style, sequence, animate } from '@angular/animations';

@Component({
  selector: "loja-app-produto",
  templateUrl: "./loja.produto.component.html",
  styleUrls: ["./loja.produto.component.css"],
  // fade para paginacao dos produtos
  animations: [
    trigger('anim', [
      transition('void => *', [
        style({ opacity: '0.1', transform: 'translateY(5px)' }), // movimento de baixo para cima com deslocamento de 5px
        sequence([
          animate('3s ease', style({ opacity: '1', transform: 'translateY(0px)' })),
        ])
      ])
    ])
  ]
})

export class LojaProdutoComponent implements OnInit {

  public produto: Produto;
  public carrinhoCompras: LojaCarrinhoCompras;
  public item: string[] = [];
  public produtosComplemento: ProdutoComplemento[];

  public produtos: Produto[];
  public produtosExibir: Produto[] = [];

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  public list: Array<number> = [];


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
      this.ObterProdutoDetalhe(produtoDetalhe);
    }
    this.obterProdutosSimilares(JSON.parse(produtoDetalhe));
  }

  public obterProdutosSimilares(produto: Produto) {
    var ItensSimilares = 3;
    this.produtosExibir = [];
    var numeroAleatorio = 0;
    var numeroUsado = false;
    this.list = [];

    //a utlizizacao somente com o while e find era mais simples de implementar, porem o indice zero, sempre retornava como true,
    // gerando falhas na visualização, trazendo itens duplicados.
    this.produtoServico.obterTodosProdutos()
      .subscribe(
        produtos => {
          this.produtos = produtos.filter(p => p.produtoCategoriaId == produto.produtoCategoriaId && p.id != produto.id);
          if (this.produtos.length < ItensSimilares) {
            for (var i = 0; i < this.produtos.length; i++) {
              this.produtosExibir.push(this.produtos[i]);
            }
          } else {
            // procura nos produtos, de forma aleatoria a quantidade para exibir como similares na tela.
            for (var i = 0; i < ItensSimilares; i++) {
              numeroAleatorio = Math.floor(Math.random() * this.produtos.length);
              numeroUsado = false;
              // verifica se o numero sorteado, ja foi utilizado para exibir em algum similar, caso ja tenha sido sorteado, procura o proximo
              while (!numeroUsado) {
                if (this.list.length > 0) {
                  // percorre todos os itens na lista verificando o se o numero sorteado ja foi exibido.
                  for (var i = 0; i < this.list.length; i++) {
                    if (numeroAleatorio == this.list[i]) {
                      numeroAleatorio = Math.floor(Math.random() * this.produtos.length);
                      numeroUsado = false;
                    } else {
                      numeroUsado = true;
                    }
                  }
                } else {
                  numeroUsado = true;
                }
              }
              this.list.push(numeroAleatorio);
              //alert("Imagem do numero atual: "+this.produtos[numeroAleatorio].nomeArquivo);
              this.produtosExibir.push(this.produtos[numeroAleatorio]);
            }
          }
        },
        erro => {
          console.log(erro.error);
        }
      )
  }


  public ObterProdutoDetalhe(produtodetalhe: string) {
    this.produto = JSON.parse(produtodetalhe);
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
  }

  public abrirProduto(produto: Produto) {
    // alert(produto.nomeArquivo);

    sessionStorage.setItem('produtoDetalhe', JSON.stringify(produto));
    this.list = [];
    this.produto = produto;
    this.ObterProdutoDetalhe(JSON.stringify(produto));
    this.obterProdutosSimilares(this.produto);
    // this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
    // this.router.onSameUrlNavigation = 'reload';
    // this.router.navigate(['/loja-produto']);
    //this.router.onSameUrlNavigation = 'reload';
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

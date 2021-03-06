import { Component, OnInit } from "@angular/core"
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { Produto } from "../../modelo/produto";
import { ProdutoComplemento } from "../../modelo/produtoComplemento";
import { Router } from "@angular/router";
import { ProdutoComplementoServico } from "../../servicos/produto/produtoComplemento.servico";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { Ng2ImgMaxService } from 'ng2-img-max';
//import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { ProdutoCategoriaServico } from "../../servicos/produto/produtoCategoria.servico";
import { CategoriaCombo } from "../../modelo/categoriaCombo";
import { ProdutoCategoria } from "../../modelo/produtoCategoria";
import { isUndefined } from "util";
import { ProdutoCategoriaHistorico } from "../../modelo/produtoCategoriaHistorico";

@Component({
  selector: "app-produto", // qual tag html que o component produto sera renderizado
  templateUrl: "./produto.component.html", //pagina que sera renderizada na pagina
  styleUrls: ["./produto.component.css"] // arquio de stilo que sera utilizado na pagina renderizada
})
export class ProdutoComponent implements OnInit {
  // nome das classes começando em maiusculo devido convencao PascalCase

  // camelCase - para variaveis, atributos e nomes das funcoes, começa com minusculo.
  produtoCategoria: ProdutoCategoria[] = [];

  galleryOptions: NgxGalleryOptions[];
  galleryOptionsPrincipal: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  galleryImagesPrincipal: NgxGalleryImage[];

  public produto: Produto;
  public categoria: ProdutoCategoriaHistorico;
  public produtoImgPrincipal: Produto;
  public prodComp: ProdutoComplemento;

  public nome: string;
  public pathFotoPrincipal: string;
  public mensagem: string;
  public selecioneCategoria: string;

  public qtdArquivos: number;
  public categoriaSelecionadaId: number;
  alturaPardaoImagem: number = 400;
  larguraPardaoImagem: number = 450;

  public item: string[] = [];
  public itensGaleria: string[] = [];
  public arquivosDeletarGaleria: string[] = [];
  public editComp: ProdutoComplemento[] = [];
  public produtoComplementos: ProdutoComplemento[] = []; // a declaracao ja esta inicializando a lista.

  public arquivoSelecionado: File;
  public image: File;

  public ativarSpinner: boolean;
  public ativarSpinnerFoto: boolean;
  public spinnerGaleria: boolean;
  public exibirFotoPrincipal: boolean;
  public exibirGaleria: boolean;
  public exibirGaleriaPrincipal: boolean;
  public liberadoParaVenda: boolean;
  public edicaoProduto: boolean;
  public DeletaImagemPrincipal: boolean; // remove a imagem antiga da base e do server
  public DeletaImagemGaleria: boolean; // remove as imagens da galeria da base e do server
  public ativarSpinnerCb: boolean;
  public idCatInvalido: boolean;

  uploadedImage: File;

  public catSelecionadaValue: number = -1;
  public catSelecionadaDisplay: string = "";
  public produtoCategoriaSession: string;

  public alterarCategoria: boolean = false;
  public exibeCheck: boolean = true;

  constructor(private produtoServico: ProdutoServico,
    private produtoComplementoServico: ProdutoComplementoServico,
    private router: Router,
    private ng2ImgMax: Ng2ImgMaxService,
    private categoriaServico: ProdutoCategoriaServico
  ) {

  }

  ngOnInit(): void {
    var produtoSession = sessionStorage.getItem('produtoSession');
    var produtoComplementoSession = sessionStorage.getItem('produtoComplementoSession');
    this.produtoCategoriaSession = sessionStorage.getItem('produtoCategoriaSession');

    // alert(produtoComplementoSession);

    // alert(this.spinnerGaleria);
    this.prodComp = new ProdutoComplemento();
    if (produtoSession != "") {
      //RECUPERANDO DADOS DO PRODUTO DA SESSAO
      this.produto = JSON.parse(produtoSession);
      this.produtoImgPrincipal = JSON.parse(produtoSession);
      this.criarGaleriaImgPrincipal(this.produto.nomeArquivo);
      this.edicaoProduto = true;

      //RECUPERANDO DADOS DA GALERIA DA SESSAO
      this.editComp = JSON.parse(produtoComplementoSession);
      var NomesArquivosComp: string[] = [];
      this.editComp.forEach(function (value) {
        console.log(value.nomeArquivo);
        //  alert("Galeria da sessao:"+ value.nomeArquivo);
        NomesArquivosComp.push(value.nomeArquivo);
      });

      this.arquivosDeletarGaleria = NomesArquivosComp;

      if (this.arquivosDeletarGaleria.length > 0) {
        this.criarGaleria(this.arquivosDeletarGaleria);
      }
      //   alert("alert0:"+this.arquivosDeletarGaleria);
     // alert(this.produtoCategoriaSession);
      if (!isUndefined(this.produtoCategoriaSession) && this.produtoCategoriaSession != "") {

        this.categoria = JSON.parse(this.produtoCategoriaSession);
        this.catSelecionadaValue = this.categoria.id;
        this.catSelecionadaDisplay = this.categoria.nomeCategoria;
       // alert("CatSelectedValue:" + this.categoria.id);
      //  alert("catSelecionadaDisplay:" + this.categoria.nomeCategoria);
        // this.produto.produtoCategoriaId = this.categoria.id;

      }
    }
    else {
      this.produto = new Produto();
      this.alterarCategoria = true;
      this.exibeCheck = false;
      this.carregaCategoria();
    }

    //alert("carrega Categoria");
    //this.carregaCategoria();

    //if (this.produto.produtoCategoriaId != null) {
    //  alert(this.produto.produtoCategoriaId);
    //  (<HTMLSelectElement>document.getElementById('categoriasId')).value = this.produtoCategoria.find(cat => cat.id == this.produto.produtoCategoriaId).nomeCategoria;
    //}
    //alert(this.produtoCategoriaSession);
    //if (!isUndefined(this.produtoCategoriaSession)) {

    //  this.categoria = JSON.parse(this.produtoCategoriaSession);
    //  this.catSelecionadaValue = this.categoria.id;
    //  this.catSelecionadaDisplay = this.categoria.nomeCategoria;
    //  alert("CatSelectedValue:" + this.categoria.id);
    //  alert("catSelecionadaDisplay:" + this.categoria.nomeCategoria);
    //  // this.produto.produtoCategoriaId = this.categoria.id;

    //}

    this.galleryOptions = [
      {
        width: '555px',
        height: '100px',
        thumbnailsColumns: 4,
        image: false,
        preview: true,
        previewCloseOnEsc: true,
        //thumbnailsRemainingCount: true,
        arrowPrevIcon: "fa fa-arrow-circle-o-left",
        arrowNextIcon: "fa fa-arrow-circle-o-right",
        closeIcon: "fa fa-window-close",
        fullscreenIcon: "fa fa-arrows",
        spinnerIcon: "fa fa-refresh fa-spin fa-3x fa-fw"
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '100px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,

      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryOptionsPrincipal = [
      {
        width: '100px',
        height: '100px',
        thumbnailsColumns: 1,
        image: false,
        preview: true,
        previewCloseOnEsc: true
        //thumbnailsRemainingCount: true,
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '100px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,

      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    //let element = (<HTMLSelectElement>document.getElementById('categoriasId'));
    //element.value = this.produtoCategoria.find(cat => cat.id == this.produto.produtoCategoriaId).id + "";
  }

  public inputChangePrincipal(files: FileList) {
    //  this.arquivoSelecionado = files.item(0);
    this.ativarSpinnerFoto = true;
    //##REDIMENSIONAR IMAGEM ANTES DE ENVIAR PARA O SERVIDOR
    this.image = files.item(0);
    this.ng2ImgMax.resizeImage(this.image, this.larguraPardaoImagem, this.alturaPardaoImagem).subscribe(
      result => {
        this.uploadedImage = new File([result], result.name);
        this.arquivoSelecionado = this.uploadedImage;// uploadedImage ja é a imagem redimensionada! 400x300
        //ENVIO DO ARQUIVO JA REDIMENSIONADO
        this.produtoServico.enviarArquivo(this.arquivoSelecionado)
          .subscribe(
            nomeArquivo => {
              this.produto.nomeArquivo = nomeArquivo;
              this.criarGaleriaImgPrincipal(nomeArquivo);
              console.log(nomeArquivo);
              this.ativarSpinnerFoto = false;
              this.exibirFotoPrincipal = true;
              if (this.edicaoProduto && this.produtoImgPrincipal.nomeArquivo != "") { this.DeletaImagemPrincipal = true };
            },
            erro => {
              console.log(erro.error);
              this.ativarSpinnerFoto = false;
              this.exibirFotoPrincipal = false;

            }
          );
      },
      error => {
        console.log('😢 Oh no!', error.error);
      }
    );
    //###########################################################
    //this.produtoServico.enviarArquivo(this.arquivoSelecionado)
    //    .subscribe(
    //        nomeArquivo => {
    //            this.produto.nomeArquivo = nomeArquivo;
    //            this.criarGaleriaImgPrincipal(nomeArquivo);
    //            console.log(nomeArquivo);
    //            this.ativarSpinnerFoto = false;
    //            this.exibirFotoPrincipal = true;
    //            if (this.edicaoProduto && this.produtoImgPrincipal.nomeArquivo != ""){ this.DeletaImagemPrincipal = true };
    //        },
    //        erro => {
    //            console.log(erro.error);
    //            this.ativarSpinnerFoto = false;
    //            this.exibirFotoPrincipal = false;

    //        }
    //    );
  }

  public inputChangeGaleria(files: FileList) {
    this.qtdArquivos = files.length;
    this.itensGaleria = [];
    if (this.edicaoProduto && this.arquivosDeletarGaleria.length > 0) { this.DeletaImagemGaleria = true };

    for (var i = 0; i < files.length; i++) {
      //this.arquivoSelecionado = files.item(i);
      //##REDIMENSIONAR IMAGEM ANTES DE ENVIAR PARA O SERVIDOR
      this.image = files.item(i);
      this.ng2ImgMax.resizeImage(this.image, this.larguraPardaoImagem, this.alturaPardaoImagem).subscribe(
        result => {
          this.uploadedImage = new File([result], result.name);
          this.arquivoSelecionado = this.uploadedImage;// uploadedImage ja é a imagem redimensionada! 400x00
          //ENVIO DO ARQUIVO JA REDIMENSIONADO
          this.produtoComplementoServico.enviarArquivo(this.arquivoSelecionado)
            .subscribe(
              nomeArquivo => {
                this.itensGaleria.push(nomeArquivo);
                this.criarGaleria(this.itensGaleria);
              },
              erro => {
                console.log(erro.error);
              }
            );
        },
        error => {
          console.log('😢 Oh no!', error.error);
        }
      );
      //##########
      //this.produtoComplementoServico.enviarArquivo(this.arquivoSelecionado)
      //    .subscribe(
      //        nomeArquivo => {
      //            this.itensGaleria.push(nomeArquivo);
      //            this.criarGaleria(this.itensGaleria);
      //        },
      //        erro => {
      //            console.log(erro.error);
      //        }
      //    );
    }
  }


  public criarGaleria(itensGaleria: string[]) {
    this.exibirGaleria = true;
    var pathArquivos = "../../../../../arquivos/";
    var array = [];
    if (itensGaleria.length >= 1) {
      //alert("populando Array das imagens a serem exibidas na tela");
      for (var i = 0; i < itensGaleria.length; i++) {
        array.push({ "small": pathArquivos + itensGaleria[i], "medium": pathArquivos + itensGaleria[i], "big": pathArquivos + itensGaleria[i] });
      }
    } else {
      this.exibirGaleria = false;
    }

    this.galleryImages = array;
    this.desativarEsperaGaleria();
  }

  public criarGaleriaImgPrincipal(principal: string) {
    // alert("Chamada Criar Galeria para exibir as imagens selecionadas");
    this.exibirGaleriaPrincipal = true;
    this.ativarSpinnerFoto = true;
    var pathArquivos = "../../../../../arquivos/";
    var array = [];

    array.push({ "small": pathArquivos + principal, "medium": pathArquivos + principal, "big": pathArquivos + principal })

    this.galleryImagesPrincipal = array;
    this.ativarSpinnerFoto = false;
  }



  public cadastrar() {

    var semImagem: string = "produto-sem-imagem.jpg";
    let produtoCadastradoId: number;
    if (this.produto.nomeArquivo == null) {
      this.produto.nomeArquivo = semImagem;
    }

    if (!isUndefined(this.produtoCategoriaSession) && this.alterarCategoria == false) {
    //  alert("Categoria session");
      this.produto.produtoCategoriaId = this.categoria.id;
    }
    else {
    //  alert("Categoria Combo");
      this.pegaIdCategoria();
      if (this.categoriaSelecionadaId <= 0 || isNaN(this.categoriaSelecionadaId)) {
        this.idCatInvalido = true;
        return;
      } else {
        this.produto.produtoCategoriaId = this.categoriaSelecionadaId;
        this.idCatInvalido = false;
      //  alert("Categoria selecionada no combo id: " + this.produto.produtoCategoriaId);
      }
    }


    this.criarGaleria(this.itensGaleria);
    this.ativarEspera();
    this.produto.prodativo = true;
    this.produtoServico.cadastrar(this.produto)
      .subscribe(
        produtoJson => {
          console.log(produtoJson);

          produtoCadastradoId = produtoJson.id;
          this.cadastrarComplemento(produtoCadastradoId);
          this.desativarEspera();
          this.router.navigate(['/pesquisar-produto']);
        },
        err => {
          this.mensagem = err.error;
          console.log(err.error);
          this.desativarEspera();
        }
      );


  }

  public cadastrarComplemento(produtoId: number) {
    this.prodComp.produtoId = produtoId;
    if (this.itensGaleria.length > 0) {
      this.ativarEsperaGaleria();
      //CADASTRANDO TODOS AS NOVAS IMAGENS
      for (var i = 0; i < this.itensGaleria.length; i++) {
        this.prodComp.nomeArquivo = this.itensGaleria[i];
        this.prodComp.tipoArquivo = "Image";
        this.prodComp.ativo = true;
        this.produtoComplementoServico.cadastrarComplemento(this.prodComp)
          .subscribe(
            produtoCompJson => {

              console.log(produtoCompJson);
              this.desativarEsperaGaleria();
            },
            err => {
              this.mensagem = err.error;
              console.log(err.error);

            }
          );
      }
      if (this.DeletaImagemGaleria) {
        //   alert("Deletar imagens Server Galeria");
        for (var i = 0; i < this.editComp.length; i++) {
          this.produtoComplementoServico.deletarArquivos(this.editComp[i])
            .subscribe(
              produtoDeletarJson => {
                console.log(produtoDeletarJson);
                this.LimparSessao();
              },
              err => {
                this.mensagem = err.error;
                console.log(err.error);
                this.desativarEspera();
              }
            );

        }

      }
    }
    //     alert("Deletar Principal:" + this.DeletaImagemPrincipal);
    //    alert(JSON.stringify(this.produtoImgPrincipal));
    // REMOVER IMAGENS ANTIGAS, CASO SEJA EDITAR
    if (this.DeletaImagemPrincipal) {
      //        alert("Deletar imagens Server PRINCIPAL");
      for (var i = 0; i < this.editComp.length; i++) {
        this.produtoServico.deletarArquivo(this.produtoImgPrincipal)
          .subscribe(
            produtoDeletarJson => {
              console.log(produtoDeletarJson);
              this.LimparSessao();
            },
            err => {
              this.mensagem = err.error;
              console.log(err.error);
              this.desativarEspera();
            }
          );

      }

    }
    this.router.navigate(['/pesquisar-produto']);
    this.LimparSessao();
  }

  public carregaCategoria() {
    //cities = [
    //  { id: 1, name: 'Vilnius' },
    //  { id: 2, name: 'Kaunas' },
    //  { id: 3, name: 'Pavilnys', disabled: true },
    //  { id: 4, name: 'Pabradė' },
    //  { id: 5, name: 'Klaipėda' }
    //];

    this.ativarSpinnerCb = true;
    this.categoriaServico.obterTodosCategorias()
      .subscribe(
        categoriass => {
          this.produtoCategoria = categoriass.filter(cat => cat.ativo == 1);
          this.ativarSpinnerCb = false;
        },
        erro => {
          console.log(erro.error);
          this.ativarSpinnerCb = false;
        }
      )
  }


  public pegaIdCategoria() {
    // To remove previous selected items from second dropdown  

    // Filter items and pass into finaldata
    this.categoriaSelecionadaId = parseInt((<HTMLSelectElement>document.getElementById('categoriasId')).value);
    this.idCatInvalido = true;
    //alert("item selecionado id: ");
    //alert(this.categoriaSelecionadaId);
    //alert(JSON.stringify(this.produtoCategoria));

  }

  public LimparSessao() {
    sessionStorage.setItem('produtoSession', "");
    sessionStorage.setItem('produtoComplementoSession', "");
  }


  public obterNome(): string {
    return "Samsung";
  }

  public ativarEspera() {
    this.ativarSpinner = true;
  }

  public desativarEspera() {
    this.ativarSpinner = false;
  }

  public ativarEsperaGaleria() {
    this.spinnerGaleria = true;
  }
  public desativarEsperaGaleria() {
    this.spinnerGaleria = false;
  }

  public checkAtivo(e) {
    if (e.target.checked) {
      this.alterarCategoria = true;
      this.carregaCategoria();
    } else {
      //this.categoria.ativo = 0;
      this.alterarCategoria = false;
    }

  }

}

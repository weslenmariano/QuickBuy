import { Component, OnInit } from "@angular/core"
import { ProdutoServico } from "../servicos/produto/produto.servico";
import { Produto } from "../modelo/produto";
import { ProdutoComplemento } from "../modelo/produtoComplemento";
import { Router } from "@angular/router";
import { ProdutoComplementoServico } from "../servicos/produto/produtoComplemento.servico";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
    selector: "app-produto", // qual tag html que o component produto sera renderizado
    templateUrl: "./produto.component.html", //pagina que sera renderizada na pagina
    styleUrls: ["./produto.component.css"] // arquio de stilo que sera utilizado na pagina renderizada
})
export class ProdutoComponent implements OnInit {
    // nome das classes começando em maiusculo devido convencao PascalCase

    // camelCase - para variaveis, atributos e nomes das funcoes, começa com minusculo.

    galleryOptions: NgxGalleryOptions[];
    galleryOptionsPrincipal: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
    galleryImagesPrincipal: NgxGalleryImage[];

    public produto: Produto;
    public produtoImgPrincipal: Produto;
    public prodComp: ProdutoComplemento;

    public nome: string;
    public pathFotoPrincipal: string;
    public mensagem: string;
    
    public qtdArquivos: number;

    public item: string[] = [];
    public itensGaleria: string[] = [];
    public arquivosDeletarGaleria: string[] = [];
    public editComp: ProdutoComplemento[] = [];
    public produtoComplementos: ProdutoComplemento[] = []; // a declaracao ja esta inicializando a lista.

    public arquivoSelecionado: File;

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
    
    
    

    constructor(private produtoServico: ProdutoServico, private produtoComplementoServico: ProdutoComplementoServico, private router: Router) {

    }

    ngOnInit(): void {
        var produtoSession = sessionStorage.getItem('produtoSession');
        var produtoComplementoSession = sessionStorage.getItem('produtoComplementoSession');

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
          
        }
        else {
            this.produto = new Produto();
        }

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
    }

    public inputChangePrincipal(files: FileList) {
        this.arquivoSelecionado = files.item(0);
        this.ativarSpinnerFoto = true;
        //##REDIMENSIONAR IMAGEM ANTES DE ENVIAR PARA O SERVIDOR

        //##########
        this.produtoServico.enviarArquivo(this.arquivoSelecionado)
            .subscribe(
                nomeArquivo => {
                    this.produto.nomeArquivo = nomeArquivo;
                    this.criarGaleriaImgPrincipal(nomeArquivo);
                    console.log(nomeArquivo);
                    this.ativarSpinnerFoto = false;
                    this.exibirFotoPrincipal = true;
                    if (this.edicaoProduto && this.produtoImgPrincipal.nomeArquivo != ""){ this.DeletaImagemPrincipal = true };
                },
                erro => {
                    console.log(erro.error);
                    this.ativarSpinnerFoto = false;
                    this.exibirFotoPrincipal = false;

                }
            );
     }

    public inputChangeGaleria(files: FileList) {
        this.qtdArquivos = files.length;
        this.itensGaleria = [];
        if (this.edicaoProduto && this.arquivosDeletarGaleria.length > 0) { this.DeletaImagemGaleria = true };
        for (var i = 0; i < files.length; i++) {
            this.arquivoSelecionado = files.item(i);
            //##REDIMENSIONAR IMAGEM ANTES DE ENVIAR PARA O SERVIDOR

            //##########
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
        this.criarGaleria(this.itensGaleria);
        this.ativarEspera();
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

    

}

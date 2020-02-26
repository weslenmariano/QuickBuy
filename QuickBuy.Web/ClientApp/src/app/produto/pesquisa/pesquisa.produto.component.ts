import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Produto } from "../../modelo/produto";
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { Router } from "@angular/router";
import { ProdutoComplemento } from "../../modelo/produtoComplemento";
import { ProdutoComplementoServico } from "../../servicos/produto/produtoComplemento.servico";
//import { Popup } from 'ng2-opd-popup';
import { trigger, transition, style, sequence, animate } from '@angular/animations';
import { ProdutoHistoricoServico } from "../../servicos/produto/produtoHistorico.servico";



@Component({
  selector: "pesquisar-produto",
  templateUrl: "./pesquisa.produto.component.html",
  styleUrls: ["./pesquisa.produto.component.css"],
  animations: [
    trigger('anim', [
      transition('void => *', [
        style({ opacity: '0.1', transform: 'translateY(5px)' }), // movimento de baixo para cima com deslocamento de 5px
        //style({ opacity: '0.1', transform: 'translateX(50px)' }), // movimento da direita para esquerda comdeslocamento de 50px
        sequence([
          animate('2s ease', style({ opacity: '1', transform: 'translateY(0px)' })),
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

export class PesquisaProdutoComponent implements OnInit {

  public produtos: Produto[];
  public produtosComplemento: ProdutoComplemento[];
  public produtoDeletar: Produto;
  public esperaDeletar: boolean;
  public ativarSpinnerBuscar: boolean;
  public possuiPaginas: boolean;
  public paginaAtual = 1;
  public itensNaPag = 10;
  public filtrar: boolean;

  @ViewChild('fechaModalPeloEventoDeOutroBotao') closeAddExpenseModal: ElementRef;


  ngOnInit(): void {
    this.ObterComplementos();
  }
  //private popup: Popup,
  constructor(private produtoServico: ProdutoServico, private produtoComplemento: ProdutoComplementoServico, private router: Router, private produtoHistoricoServico: ProdutoHistoricoServico) {
    this.ObterProdutos();
    // this.ObterComplementos();


  }

  public ObterProdutos() {
    this.produtoServico.obterTodosProdutos().subscribe(
      produtos => {
        this.produtos = produtos;
      },
      erro => {
        console.log(erro.error);
      }
    )
  }
  public ObterComplementos() {
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
    sessionStorage.setItem('produtoSession', "");
    this.router.navigate(['../produto']);

  }

  public setadeletarProduto(produto: Produto) {
    //alert("setadeletarProduto");

    this.produtoDeletar = produto;
  }

  public deletarProduto(produto: Produto) {

    //this.popup.options = {
    //    header: "Confirmação de Exclusão",
    //    color: "#DF0101", // red, blue....
    //    //widthProsentage: 30, // The with of the popou measured by browser width
    //    animationDuration: 1, // in seconds, 0 = no animation
    //    showButtons: false, // You can hide this in case you want to use custom buttons
    //    //confirmBtnContent: "Deletar", // The text on your confirm button
    //    //cancleBtnContent: "Cancelar", // the text on your cancel button
    //    //confirmBtnClass: "btn btn-danger ", // your class for styling the confirm button
    //    //cancleBtnClass: "btn btn-primary margin-right: 3px;",
    //    animation: "bounceIn" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    //};


    this.produtoDeletar = produto;
    //   this.popup.show(this.popup.options);

  }

  public DeletarConfirmado() {
    this.esperaDeletar = true;

    //DELETAR ARQUIVOS DO SERVIDOR -- IMAGENS GALERIA
    this.produtosComplemento = this.produtosComplemento.filter(pc => pc.produtoId == this.produtoDeletar.id);
    for (var i = 0; i < this.produtosComplemento.length; i++) {
      this.produtoComplemento.deletarArquivos(this.produtosComplemento[i])
        .subscribe(
          produtoDeletarJson => {
            console.log(produtoDeletarJson);

          },
          err => {
            console.log(err.error);
          }
        );

    }
    //DELETAR ARQUIVOS DO SERVIDOR -- IMAGEM PRINCIPAL
    if (this.produtoDeletar.nomeArquivo == "produto-sem-imagem.jpg") {
      this.produtoDeletar.nomeArquivo = null;
    }
    this.produtoServico.deletarArquivo(this.produtoDeletar)
      .subscribe(
        produtoDeletarJson => {
          console.log(produtoDeletarJson);

        },
        err => {
          console.log(err.error);
        }
      );

    

    //alert("Deletar PRODUTO");
    if (this.produtoDeletar) {

      // SALVAR PRODUTO NO HISTORICO ANTES DE DELETAR
      //alert("Produto Deletar");
      this.produtoHistoricoServico.cadastrar(this.produtoDeletar).subscribe(
        produtoDeletar => {
          console.log("Produto Armazenado no histórico");
        },
        seerro => {
          console.log("Erro ao armazenar no histórico" + seerro.error);
        }
      )
      //

      this.produtoServico.deletar(this.produtoDeletar).subscribe(
        produtos => {
          this.produtos = produtos;

        },
        erro => {
          console.log(erro.error);
        }
      )
    }

    //graças a biblioteca de ViewChild, ElementRef do angular core
    //referencia o botao superior direito do modal (que possui o data-dismiss), chamando o evento de clique nele, ao qual fecha o modal por aqui.

    this.LimparSessao();
    this.ObterComplementos();
    this.esperaDeletar = false;
    //for (var i = 0; i < 10000; i++) {
    //    i++;
    //}
    // alert("Vai fechar o modal");
    this.closeAddExpenseModal.nativeElement.click();
    //  this.popup.hide(); // PRIMEIRA VERSAO POPUP
  }

  public DeletarCancelado() {
    this.esperaDeletar = false;
    //    this.popup.hide(); // PRIMEIRA VERSAO POPUP
  }

  public editarProduto(produto: Produto) {

    this.ObterComplementos();

    this.produtosComplemento = this.produtosComplemento.filter(pc => pc.produtoId == produto.id);
    // alert(this.produtosComplemento.length);
    // alert(JSON.stringify(this.produtosComplemento));

    //alert(JSON.stringify(produto));
    // alert(JSON.stringify(this.produtosComplemento));

    console.log(JSON.stringify(produto))
    console.log(JSON.stringify(this.produtosComplemento));

    sessionStorage.setItem('produtoSession', JSON.stringify(produto));
    sessionStorage.setItem('produtoComplementoSession', JSON.stringify(this.produtosComplemento));
    this.router.navigate(['../produto/']);

  }

  public LimparSessao() {
    sessionStorage.setItem('produtoSession', "");
    sessionStorage.setItem('produtoComplementoSession', "");
  }

  public exibirFiltro() {
    this.filtrar = !this.filtrar;
  }

  public filtrarResultados() {
    //alert("filtrarResultados");
    //recuperando o value do campo nda pagina html;
    var filtro = (<HTMLSelectElement>document.getElementById('inputBuscar')).value;
    this.ativarSpinnerBuscar = true;
    this.produtoServico.obterTodosProdutos()
      .subscribe(
        produtos => {
          this.produtos = produtos.filter(p => p.descricao.toLowerCase().search(filtro.toLowerCase()) != -1 || p.descricao.toLowerCase().search(filtro.toLowerCase()) != -1);
          if (this.produtos.length > 10) { this.possuiPaginas = true; } else { this.possuiPaginas = false; }
          this.ativarSpinnerBuscar = false;
        },
        erro => {
          console.log(erro.error);
        }
      )
  }


}

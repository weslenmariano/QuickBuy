import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ProdutoCategoria } from "../../modelo/produtoCategoria";
import { ProdutoCategoriaServico } from "../../servicos/produto/produtoCategoria.servico";

import { Router } from "@angular/router";
//import { Popup } from 'ng2-opd-popup';
import { trigger, transition, style, sequence, animate } from '@angular/animations';
import { ProdutoCategoriaHistorico } from "../../modelo/produtoCategoriaHistorico";
import { ProdutoCategoriaHistoricoServico } from "../../servicos/produto/produtoCategoriaHistorico.servico";




@Component({
  selector: "pesquisar-categoria",
  templateUrl: "./pesquisa.categoria.component.html",
  styleUrls: ["./pesquisa.categoria.component.css"],
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

export class PesquisaCategoriaComponent implements OnInit {

  public categorias: ProdutoCategoria[];
  public categoriaDeletar: ProdutoCategoria;

  public esperaDeletar: boolean;
  public ativarSpinnerBuscar: boolean;
  public possuiPaginas: boolean;

  public paginaAtual = 1;
  public itensNaPag = 10;
  public filtrar: boolean;
  public filtarAtivos: number = 1;

  public mensagem: string;

  @ViewChild('fechaModalPeloEventoDeOutroBotao') closeAddExpenseModal: ElementRef;


  ngOnInit(): void {

  }
  //private popup: Popup,
  constructor(private produtoCategoriaServico: ProdutoCategoriaServico, private router: Router, private produtoCategoriaHistoricoServico: ProdutoCategoriaHistoricoServico) {
    this.ObterCategorias();
    // this.ObterComplementos();


  }

  public ObterCategorias() {
    this.produtoCategoriaServico.obterTodosCategorias().subscribe(
      categorias => {
        this.categorias = categorias;
        if (this.categorias.length > 10) { this.possuiPaginas = true; } else { this.possuiPaginas = false; }
      },
      erro => {
        console.log(erro.error);
      }
    )
  }

  public adicionarCategoria() {
    sessionStorage.setItem('produtoCategoriaSession', "");
    this.router.navigate(['../categoria']);

  }

  public filtrarAtivos() {
    this.filtarAtivos = 1;
    //  alert("ativo:"+this.filtarAtivos);
  }
  public filtrarInativos() {
    this.filtarAtivos = 0;
    //        alert("inativo:"+this.filtarAtivos);
  }
  public filtrarTodas() {
    this.filtarAtivos = -1;
    //      alert("inativo:" + this.filtarAtivos);
  }


  public setadeletarCategoria(categoria: ProdutoCategoria) {
    //alert("setadeletarProduto");

    this.categoriaDeletar = categoria;
    this.mensagem = "";
  }

  public catAtiva(categoria: number) {
    var retorno: string;
    if (categoria == 0) {
      retorno = "Não";
    }
    else {
      retorno = "Sim";
    }
    return retorno;
  }
  //public deletarCategoria(categoria: ProdutoCategoria) {
  // //   this.produtoDeletar = produto;
  // //   this.popup.show(this.popup.options);
  //}

  public DeletarConfirmado() {
    this.esperaDeletar = true;
   
    //alert("Deletar PRODUTO");
    if (this.categoriaDeletar) {

      this.produtoCategoriaServico.deletar(this.categoriaDeletar).subscribe(
        categoriass => {
          this.categorias = categoriass;
          // SALVAR Categoria NO HISTORICO ANTES DE DELETAR
          //alert("categoria Deletar");
          this.produtoCategoriaHistoricoServico.cadastrar(this.categoriaDeletar).subscribe(
            categoriaDeletar => {
              console.log("Categoria Armazenado no histórico");
            },
            seerro => {
              console.log("Erro ao armazenar categoria no histórico" + seerro.error);
            }
          )
      //
          this.closeAddExpenseModal.nativeElement.click();
        },
        erro => {
          console.log(erro.error);
          this.mensagem = erro.error;
          if (this.mensagem) {
            return;
          }
          else {
            this.closeAddExpenseModal.nativeElement.click();
          }
        }
      )
    }

    //graças a biblioteca de ViewChild, ElementRef do angular core
    //referencia o botao superior direito do modal (que possui o data-dismiss), chamando o evento de clique nele, ao qual fecha o modal por aqui.
    this.esperaDeletar = false;
    
    //  this.popup.hide(); // PRIMEIRA VERSAO POPUP
  }

  public DeletarCancelado() {
    this.esperaDeletar = false;
    //    this.popup.hide(); // PRIMEIRA VERSAO POPUP
  }

  public editarCategoria(categoria: ProdutoCategoria) {


    console.log(JSON.stringify(categoria))


    sessionStorage.setItem('produtoCategoriaSession', JSON.stringify(categoria));

    this.router.navigate(['../categoria']);

  }

  public LimparSessao() {
    sessionStorage.setItem('produtoCategoriaSession', "");
  }

  public exibirFiltro() {
    this.filtrar = !this.filtrar;
  }

  public fecharFiltro() {
    this.exibirFiltro();
    (<HTMLSelectElement>document.getElementById('inputBuscar')).value = "";
    this.filtarAtivos = -1;
    this.filtrarResultados();
  }

  public filtrarResultados() {
    //alert("filtrarResultados");
    //recuperando o value do campo nda pagina html;
    var filtro = (<HTMLSelectElement>document.getElementById('inputBuscar')).value;
    this.ativarSpinnerBuscar = true;
    this.produtoCategoriaServico.obterTodosCategorias()
      .subscribe(
        categoriass => {
          if (filtro != "") {
            this.categorias = categoriass.filter(cat => cat.nomeCategoria.toLowerCase().search(filtro.toLowerCase()) != -1
              || cat.descricaoCategoria.toLowerCase().search(filtro.toLowerCase()) != -1);
          } else {
            this.categorias = categoriass;
          }
          if (this.filtarAtivos != -1) {
            this.categorias = this.categorias.filter(cat => cat.ativo == this.filtarAtivos);
          }

          if (this.categorias.length > 10) { this.possuiPaginas = true; } else { this.possuiPaginas = false; }
          this.ativarSpinnerBuscar = false;
        },
        erro => {
          console.log(erro.error);
        }
      )

  }

}

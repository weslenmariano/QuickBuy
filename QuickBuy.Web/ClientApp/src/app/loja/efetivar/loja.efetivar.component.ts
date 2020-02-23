import { Component, OnInit } from "@angular/core";
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { LojaCarrinhoCompras } from "../carrinho-compras/loja.carrinho.compras.component";
import { Produto } from "../../modelo/produto";
import { Router } from "@angular/router";
import { Pedido } from "../../modelo/pedido";
import { UsuarioServico } from "../../servicos/usuario/usuario.servico";
import { ItemPedido } from "../../modelo/itemPedido";
import { PedidoServico } from "../../servicos/pedido/pedido.servico";
import { forEach } from "@angular/router/src/utils/collection";
import { isUndefined } from "util";

@Component({
  selector: "loja-efetivar",
  templateUrl: "./loja.efetivar.component.html",
  styleUrls: ["./loja.efetivar.component.css"]
})

export class LojaEfetivarComponent implements OnInit {
  public carrinhoCompras: LojaCarrinhoCompras;
  public produtos: Produto[];
  public total: number;
  public produto: Produto;
  public prodInvalido: boolean;
  public produtoLocal: Produto;
  public todosProdutos: Produto[] = [];
  public carregandoProdutos: boolean;

  ngOnInit(): void {
    this.carregandoProdutos = true;
    this.carrinhoCompras = new LojaCarrinhoCompras();
    //this.produtos = this.carrinhoCompras.obterProdutos();
    //this.produtos = this.produtos.filter(p => p.usuarioId == this.usuarioServico.usuario.id);
   // alert("verificar se houve mudanças");
    //VERIFICA ALTERACOES DE PRODUTOS NO CARRINHO COM A BASE.
    //this.verificarAlteracoesProduto(this.produtos);
    this.verificarAlteracoes();
    //
    
  }

  constructor(private usuarioServico: UsuarioServico, private pedidoServico: PedidoServico, private router: Router, private produtoServico: ProdutoServico) {

  }

  public atualizarPreco(produto: Produto, quantidade: number) {
    if (!produto.precoOriginal) {
      produto.precoOriginal = produto.preco;
    }
    if (quantidade <= 0) {
      quantidade = 1;
      produto.quantidade = quantidade;
    }
    produto.preco = produto.precoOriginal * quantidade;
    this.carrinhoCompras.atualizar(this.produtos);
    this.atualizarTotal();




  }

  public remover(produto: Produto) {
    this.carrinhoCompras.removerProduto(produto);
    this.produtos = this.carrinhoCompras.obterProdutos();
    this.produtos = this.produtos.filter(p => p.usuarioId == this.usuarioServico.usuario.id);
    //VERIFICA ALTERACOES DE PRODUTOS NO CARRINHO COM A BASE.
    this.verificarAlteracoes();
    //
    this.atualizarTotal();
    if (!this.temProdutoDoUsuario()) {
      this.router.navigate(['/']);
    }
  }

  public atualizarTotal() {
    // reduce percorre toda a lista, item a item.
    // acc variavel acumuladora
    // produto variavel a ser usada como lambda
    // acc + produto.preco ---- é feito a somatorio do anterior total + o item atual.
    // 0 é o indice que sera iniciado a leitura da lista
    this.total = this.produtos.reduce((acc, produto) => acc + produto.preco, 0);
  }

  public efetivarCompra() {
    //alert("Verificar Alteracoes Compra");
    this.verificarAlteracoesCompra();
  

    
  }

  public criarPedido(): Pedido {
    let pedido = new Pedido();

    pedido.usuarioId = this.usuarioServico.usuario.id;
    pedido.cep = "123456789";
    pedido.cidade = "Sao Paulo";
    pedido.estado = "Sao Paulo";
    pedido.dataPrevisaoEntrega = new Date();
    pedido.formaPagamentoId = 1;
    pedido.numeroEndereco = "12";
    pedido.enderecoCompleto = "endereco completo"

    this.produtos = this.carrinhoCompras.obterProdutos();
    //this.produtos.filter(p => p.usuarioId = this.usuarioServico.usuario.id);

    for (let produto of this.produtos) {
      let itemPedido = new ItemPedido();
      itemPedido.produtoId = produto.id;

      if (!produto.quantidade) {
        produto.quantidade = 1;
      }
      itemPedido.quantidade = produto.quantidade;

      pedido.itensPedido.push(itemPedido);
      alert("Quantidade de itens:" + pedido.itensPedido.length);
    }

    return pedido;
  }

  public temProdutoDoUsuario(): boolean {
    //alert(this.produtos.length);
    if (this.produtos.length > 0) {
      return true;
    }
    return false;
  }

  public abrirProduto(produto: Produto) {
    // alert(produto.nomeArquivo);

    sessionStorage.setItem('produtoDetalhe', JSON.stringify(produto));
    this.router.navigate(['/loja-produto'])

  }
  public verificarAlteracoes() {
    this.todosProdutos = [];
    this.prodInvalido = false;
    this.carregandoProdutos = true;
    this.produtoServico.obterTodosProdutos()
      .subscribe(
        prod => {
          this.produtos = this.carrinhoCompras.obterProdutos();
          this.produtos = this.produtos.filter(p => p.usuarioId == this.usuarioServico.usuario.id);
          for (var i = 0; i < this.produtos.length; i++) {
            this.produtoLocal = prod.filter(p => p.id == this.produtos[i].id)[0];
            if (isUndefined(this.produtoLocal)) {
              this.produtos[i].alterado = true;
              this.prodInvalido = true;
            } else {
              this.todosProdutos.push(this.produtoLocal);
            }
            
          }

          for (var i = 0; i < this.produtos.length; i++) {
            var produtoValidar: Produto;
            if (this.produtos[i].alterado == false) {
              produtoValidar = this.todosProdutos.filter(p => p.id == this.produtos[i].id)[0];
              if ((this.produtos[i].id == produtoValidar.id) &&
                (this.produtos[i].nome == produtoValidar.nome) &&
                (this.produtos[i].descricao == produtoValidar.descricao) &&
                (this.produtos[i].preco == produtoValidar.preco) &&
                (this.produtos[i].produtoCategoriaId == produtoValidar.produtoCategoriaId)
              ) {
                this.produtos[i].alterado = false;
              }
              else {
                this.produtos[i].alterado = true;
                this.prodInvalido = true;
              }
            }
          }
            //this.total = this.produtos.reduce((acc, produto) => acc + produto.preco, 0);
            this.atualizarTotal();
            if (!this.temProdutoDoUsuario()) {
              this.router.navigate(['/']);
            }
            this.carregandoProdutos = false;
          },
          seerro => {
            this.carregandoProdutos = false;
            console.log(seerro.error);
          });
    
  }

  public verificarAlteracoesCompra() {
    this.prodInvalido = false;
    this.todosProdutos = [];
    this.produtoServico.obterTodosProdutos()
      .subscribe(
        prod => {
          this.produtos = this.carrinhoCompras.obterProdutos();
          this.produtos = this.produtos.filter(p => p.usuarioId == this.usuarioServico.usuario.id);
          for (var i = 0; i < this.produtos.length; i++) {
            this.produtoLocal = prod.filter(p => p.id == this.produtos[i].id)[0];
            if (isUndefined(this.produtoLocal)) {
              this.produtos[i].alterado = true;
              this.prodInvalido = true;
            } else {
              this.todosProdutos.push(this.produtoLocal);
            }
          }
          for (var i = 0; i < this.produtos.length; i++) {
            var produtoValidar: Produto;
            if (this.produtos[i].alterado == false) {
              produtoValidar = this.todosProdutos.filter(p => p.id == this.produtos[i].id)[0];
              if ((this.produtos[i].id == produtoValidar.id) &&
                (this.produtos[i].nome == produtoValidar.nome) &&
                (this.produtos[i].descricao == produtoValidar.descricao) &&
                (this.produtos[i].preco == produtoValidar.preco) &&
                (this.produtos[i].produtoCategoriaId == produtoValidar.produtoCategoriaId)
              ) {
                this.produtos[i].alterado = false;
              }
              else {
                this.produtos[i].alterado = true;
                this.prodInvalido = true;
              }
            }
          }
          
          ///
          if (!this.prodInvalido) {
            this.pedidoServico.efetivarCompra(this.criarPedido())
              .subscribe(
                pedidoId => {
                  console.log(pedidoId);
                  sessionStorage.setItem("pedidoId", pedidoId.toString());
                  this.produtos = [];
                  this.carrinhoCompras.limparCarrinhoCompras();
                  //redirecionar para outra pagina
                  this.router.navigate(['/compra-realizada-sucesso']);

                },
                seerro => {
                  console.log(seerro.error);
                });


          }
          ///
          else {
            this.atualizarTotal();
            if (!this.temProdutoDoUsuario()) {
              this.router.navigate(['/']);
            }
            this.carregandoProdutos = false;
          }
        },
        seerro => {
          this.carregandoProdutos = false;
          console.log(seerro.error);
        });

  }
}

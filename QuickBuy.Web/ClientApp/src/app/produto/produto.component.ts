import { Component, OnInit } from "@angular/core"
import { ProdutoServico } from "../servicos/produto/produto.servico";
import { Produto } from "../modelo/produto";

@Component({
  selector: "app-produto", // qual tag html que o component produto sera renderizado
  templateUrl: "./produto.component.html", //pagina que sera renderizada na pagina
  styleUrls: ["./produto.component.css"] // arquio de stilo que sera utilizado na pagina renderizada
})
export class ProdutoComponent implements OnInit {
     // nome das classes começando em maiusculo devido convencao PascalCase

  // camelCase - para variaveis, atributos e nomes das funcoes, começa com minusculo.

  public nome: string;
  public liberadoParaVenda: boolean;

  public produto: Produto;

  constructor(private produtoServico: ProdutoServico) {

  }

  ngOnInit(): void {
    this.produto = new Produto();
  }

  public cadastrar() {
    this.produtoServico.cadastrar(this.produto)
      .subscribe(
        produtoJson => {
          console.log(produtoJson);

        },
        err => {
          console.log(err.error);
        }
      );
  }
  public obterNome(): string {
    return "Samsung";
  }

}

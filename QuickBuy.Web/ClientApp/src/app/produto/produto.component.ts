import { Component, OnInit } from "@angular/core"
import { ProdutoServico } from "../servicos/produto/produto.servico";
import { Produto } from "../modelo/produto";
import { Router } from "@angular/router";

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
    public arquivoSelecionado: File;
    public ativarSpinner: boolean;
    public ativarSpinnerFoto: boolean;
    public mensagem: string;

    constructor(private produtoServico: ProdutoServico, private router: Router) {

    }

    ngOnInit(): void {
        this.produto = new Produto();
    }

    public inputChange(files: FileList) {


        this.arquivoSelecionado = files.item(0);
        this.ativarSpinnerFoto = true;
        //alert(this.arquivoSelecionado.name);
        this.produtoServico.enviarArquivo(this.arquivoSelecionado)
            .subscribe(
                nomeArquivo => {
                    this.produto.nomeArquivo = nomeArquivo;
                    //alert(this.produto.nomeArquivo)
                    console.log(nomeArquivo);
                    this.ativarSpinnerFoto = false;
                },
                erro => {
                    console.log(erro.error);
                    this.ativarSpinnerFoto = false;

                }
            );
    }

    public cadastrar() {
        this.ativarEspera();
        this.produtoServico.cadastrar(this.produto)
            .subscribe(
                produtoJson => {
                    console.log(produtoJson);
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
    public obterNome(): string {
        return "Samsung";
    }

    public ativarEspera() {
        this.ativarSpinner = true;
    }

    public desativarEspera() {
        this.ativarSpinner = false;
    }


}

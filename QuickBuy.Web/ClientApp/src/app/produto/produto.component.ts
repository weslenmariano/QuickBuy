import { Component } from "@angular/core"

@Component({
    selector: "app-produto", // qual tag html que o component produto sera renderizado
    template:"<html><body>{{ obterNome()}}</body></html>"
})
export class ProdutoComponent { // nome das classes começando em maiusculo devido convencao PascalCase

    // camelCase - para variaveis, atributos e nomes das funcoes, começa com minusculo.

    public nome: string;
    public liberadoParaVenda: boolean;

    public obterNome(): string {
        return "Samsung";
    }

}

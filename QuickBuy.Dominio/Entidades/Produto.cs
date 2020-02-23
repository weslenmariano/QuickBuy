using QuickBuy.Dominio.ObjetoDeValor;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Dominio.Entidades
{
    public class Produto : Entidade
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public decimal Preco { get; set; }
        public string NomeArquivo { get; set; }
        public DateTime DataCadastro { get; set; }
        public string Tag { get; set; }
        public bool Ativo { get; set; }
        public int ProdutoCategoriaId { get; set; }
        public virtual ProdutoCategoria ProdutoCategoria { get; set; }

        public override void Validate()
        {
            LimparMensagensValidacao();

            if (string.IsNullOrEmpty(Nome))
                AdicionarCritica("Nome não pode ser vazio");

            if (string.IsNullOrEmpty(Descricao))
                AdicionarCritica("A descrição não foi informada");
        }
    }
}

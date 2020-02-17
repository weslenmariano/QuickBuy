using System;
using System.Collections.Generic;
using System.Text;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Dominio.Enumerados;

namespace QuickBuy.Dominio.ObjetoDeValor
{
    public class ProdutoCategoria : Entidade
    {
        public int Id { get; set; }
        public string NomeCategoria{ get; set; }
        public string DescricaoCategoria { get; set; }
        public int Ativo { get; set; }
        public DateTime DataCadastro { get; set; }


        public override void Validate()
        {
            LimparMensagensValidacao();

            if (string.IsNullOrEmpty(NomeCategoria))
                AdicionarCritica("NomeCategoria não pode ser vazio");


        }
    }
}

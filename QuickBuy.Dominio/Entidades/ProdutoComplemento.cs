using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Dominio.Entidades
{
    public class ProdutoComplemento : Entidade
    {
        public int Id { get; set; }
        public int ProdutoId { get; set; }
        public virtual Produto Produto { get; set; }
        public string NomeArquivo { get; set; }
        public string TipoArquivo { get; set; }
        public bool Ativo { get; set; }


        public override void Validate()
        {
            LimparMensagensValidacao();

            if (string.IsNullOrEmpty(NomeArquivo))
                AdicionarCritica("NomeArquivo não pode ser vazio");

           
        }
    }
}

using System;
using System.Collections.Generic;
using System.Text;
using QuickBuy.Dominio.Enumerados;

namespace QuickBuy.Dominio.ObjetoDeValor
{
    public class ProdutoCategoria 
    {
        public int Id { get; set; }
        public string NomeCategoria{ get; set; }
        public string DescricaoCategoria { get; set; }
        public bool Ativo { get; set; }
        public DateTime DataCadastro { get; set; }
    }
}

using QuickBuy.Dominio.ObjetoDeValor;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Dominio.Entidades
{
    public class ProdutoHistorico 
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
        public DateTime DataAcao { get; set; }

    }
}

using QuickBuy.Dominio.ObjetoDeValor;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Dominio.Entidades
{
    public class CategoriaHistorico
    {
        public int Id { get; set; }
        public string NomeCategoria { get; set; }
        public string DescricaoCategoria { get; set; }
        public int Ativo { get; set; }
        public DateTime DataCadastro { get; set; }
        public DateTime DataAcao { get; set; }

    }
}

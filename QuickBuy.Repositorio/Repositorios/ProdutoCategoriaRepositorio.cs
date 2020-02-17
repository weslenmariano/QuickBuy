using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Dominio.ObjetoDeValor;
using QuickBuy.Repositorio.Contexto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QuickBuy.Repositorio.Repositorios
{
    public class ProdutoCategoriaRepositorio : BaseRepositorio<ProdutoCategoria>, IProdutoCategoriaRepositorio
    {
        public ProdutoCategoriaRepositorio(QuickBuyContexto quickBuyContexto) : base(quickBuyContexto)
        {
        }

        public ProdutoCategoria ObterDadosCategoria(string nomeCategoria)
        {
           return QuickBuyContexto.ProdutoCategoria.FirstOrDefault(ct => ct.NomeCategoria == nomeCategoria);
        }
    }
}

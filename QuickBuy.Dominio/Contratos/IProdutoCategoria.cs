using QuickBuy.Dominio.Entidades;
using QuickBuy.Dominio.ObjetoDeValor;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Dominio.Contratos
{
    public interface IProdutoCategoriaRepositorio : IBaseRepositorio<ProdutoCategoria>
    {
        ProdutoCategoria ObterDadosCategoria(string nomeCategoria);
    }
}

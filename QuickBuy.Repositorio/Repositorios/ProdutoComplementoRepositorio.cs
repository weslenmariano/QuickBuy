using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Repositorio.Contexto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QuickBuy.Repositorio.Repositorios
{
    public class ProdutoComplementoRepositorio : BaseRepositorio<ProdutoComplemento>, IProdutoComplementoRepositorio
    {
        public ProdutoComplementoRepositorio(QuickBuyContexto quickBuyContexto) : base(quickBuyContexto)
        {
            
        }

        public IEnumerable<ProdutoComplemento> ObterDadosProduto()
        {
            return QuickBuyContexto.ProdutoComplementos.ToList();

            
        }

      
    }
}

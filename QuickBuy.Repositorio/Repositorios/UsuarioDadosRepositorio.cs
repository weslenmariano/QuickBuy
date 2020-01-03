using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Repositorio.Contexto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QuickBuy.Repositorio.Repositorios
{
    public class UsuarioDadosRepositorio : BaseRepositorio<UsuarioDados>, IUsuarioDadosRepositorio
    {
        public UsuarioDadosRepositorio(QuickBuyContexto quickBuyContexto) : base(quickBuyContexto)
        {
        }

        public UsuarioDados ObterDadosUsuario(string email)
        {
            var usuario = QuickBuyContexto.Usuarios.FirstOrDefault(u => u.Email == email);

            return QuickBuyContexto.UsuarioDados.FirstOrDefault(ud => ud.UsuarioId == usuario.Id); ;
        }

    
    }
}

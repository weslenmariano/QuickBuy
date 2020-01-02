using Microsoft.AspNetCore.Mvc;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickBuy.Web.Controllers
{
    [Route("api/[Controller]")]
    public class UsuarioDadosController : Controller
    {

        private readonly IUsuarioDadosRepositorio _usuarioDadosRepositorio;
        public UsuarioDadosController(IUsuarioDadosRepositorio usuarioDadosRepositorio)
        {
            _usuarioDadosRepositorio = usuarioDadosRepositorio;
        }
        [HttpGet]
        public IActionResult Get(string email)
        {
            try
            {
               return Ok(_usuarioDadosRepositorio.ObterDadosUsuario(email));
              //   return Ok("bateu na API");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());

            }
        }
    }
}

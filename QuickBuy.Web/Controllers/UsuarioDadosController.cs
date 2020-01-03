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

        [HttpPost]
        public IActionResult Post([FromBody]UsuarioDados usuarioDados)
        {
            try
            {
                usuarioDados.Validate();
                if (!usuarioDados.EhValido)
                {
                    return BadRequest(usuarioDados.ObterMensagensValidacao());
                }

                if (usuarioDados.Id > 0)
                {
                    _usuarioDadosRepositorio.Atualizar(usuarioDados);
                }
                else
                {
                    _usuarioDadosRepositorio.Adicionar(usuarioDados);
                }

                return Created("api/usuarioDados", usuarioDados);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());

            }
        }
    }
}

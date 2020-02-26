using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace QuickBuy.Web.Controllers
{
    [Route("api/[controller]")]
    public class ProdutoHistoricoController : Controller
    {
        private readonly IProdutoHistoricoRepositorio _produtoHistoricoRepositorio;
        private IHttpContextAccessor _httpContextAccessor;
        private IHostingEnvironment _hostingEnvironment;
        public ProdutoHistoricoController(IProdutoHistoricoRepositorio produtoHistoricoRepositorio,
                                 IHttpContextAccessor httpContextAccessor,
                                 IHostingEnvironment hostingEnvironment)
        {
            _produtoHistoricoRepositorio = produtoHistoricoRepositorio;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Json(_produtoHistoricoRepositorio.ObterTodos());
                
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());

            }
        }

        [HttpPost("obter")]
        public IActionResult obter([FromBody] int produtoId)
        {
            try
            {
                return Json(_produtoHistoricoRepositorio.ObterPorId(produtoId));

            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());

            }
        }


        [HttpPost]
        public IActionResult Post([FromBody]ProdutoHistorico produto)
        {
            try
            {
               
                _produtoHistoricoRepositorio.Adicionar(produto);
                               
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());

            }
        }

        [HttpPost("Deletar")]
        public IActionResult Deletar([FromBody] ProdutoHistorico produto)
        {
            try
            {
                /// produto da requisicao deve tar a propriedade do Id > 0 para conseguir remover.
                _produtoHistoricoRepositorio.Remover(produto);
                return Json(_produtoHistoricoRepositorio.ObterTodos());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        
    }
}

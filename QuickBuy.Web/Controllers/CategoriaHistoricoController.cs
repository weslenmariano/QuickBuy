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
    public class CategoriaHistoricoController : Controller
    {
        private readonly ICategoriaHistoricoRepositorio _categoriaHistoricoRepositorio;
        private IHttpContextAccessor _httpContextAccessor;
        private IHostingEnvironment _hostingEnvironment;
        public CategoriaHistoricoController(ICategoriaHistoricoRepositorio categoriaHistoricoRepositorio,
                                 IHttpContextAccessor httpContextAccessor,
                                 IHostingEnvironment hostingEnvironment)
        {
            _categoriaHistoricoRepositorio = categoriaHistoricoRepositorio;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Json(_categoriaHistoricoRepositorio.ObterTodos());
                
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());

            }
        }

        [HttpPost("obter")]
        public IActionResult obter([FromBody] int categoriaHisId)
        {
            try
            {
                return Json(_categoriaHistoricoRepositorio.ObterPorId(categoriaHisId));

            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());

            }
        }


        [HttpPost]
        public IActionResult Post([FromBody]CategoriaHistorico categoriaHist)
        {
            try
            {

                _categoriaHistoricoRepositorio.Adicionar(categoriaHist);
                               
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());

            }
        }

        [HttpPost("Deletar")]
        public IActionResult Deletar([FromBody] CategoriaHistorico categoriaHist)
        {
            try
            {
                ///  da requisicao deve tar a propriedade do Id > 0 para conseguir remover.
                _categoriaHistoricoRepositorio.Remover(categoriaHist);
                return Json(_categoriaHistoricoRepositorio.ObterTodos());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        
    }
}

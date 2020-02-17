using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Dominio.ObjetoDeValor;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace QuickBuy.Web.Controllers
{
    [Route("api/[controller]")]
    public class ProdutoCategoriaController : Controller
    {
        private readonly IProdutoCategoriaRepositorio _produtoCategoriaRepositorio;
        private IHttpContextAccessor _httpContextAccessor;
        private IHostingEnvironment _hostingEnvironment;
        public ProdutoCategoriaController(IProdutoCategoriaRepositorio produtoCategoriaRepositorio,
                                 IHttpContextAccessor httpContextAccessor,
                                 IHostingEnvironment hostingEnvironment)
        {
            _produtoCategoriaRepositorio = produtoCategoriaRepositorio;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Json(_produtoCategoriaRepositorio.ObterTodos());
                
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());

            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]ProdutoCategoria produtoCategoria)
        {
            try
            {
                produtoCategoria.Validate();
                if(!produtoCategoria.EhValido)
                {
                    return BadRequest(produtoCategoria.ObterMensagensValidacao());
                }

                if (produtoCategoria.Id > 0)
                {
                    _produtoCategoriaRepositorio.Atualizar(produtoCategoria);
                }
                else
                {
                    _produtoCategoriaRepositorio.Adicionar(produtoCategoria);
                }
                
                return Created("api/produtoCategoria", produtoCategoria);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());

            }
        }

        [HttpPost("Deletar")]
        public IActionResult Deletar([FromBody] ProdutoCategoria produtoCategoria)
        {
            try
            {
                /// produto da requisicao deve tar a propriedade do Id > 0 para conseguir remover.
                _produtoCategoriaRepositorio.Remover(produtoCategoria);
                return Json(_produtoCategoriaRepositorio.ObterTodos());
            }//1451
            catch (Exception ex) //when (ex.InnerException.Dat == 1451)
            {
                //string msg;
                //msg = ex.InnerException.Message.ToString();
                if (ex.InnerException.Message.ToString().Contains("foreign key constraint fails"))
                {
                    return BadRequest("Não é possível remover uma categoria que esta atrelada a um produto.");
                }
                else
                {
                    return BadRequest(ex.ToString());
                }
            }
        }
    }
}

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
    public class ProdutoComplementoController : Controller
    {
        private readonly IProdutoComplementoRepositorio _produtoComplementoRepositorio;
        private IHttpContextAccessor _httpContextAccessor;
        private IHostingEnvironment _hostingEnvironment;
        public ProdutoComplementoController(IProdutoComplementoRepositorio produtoComplementoRepositorio,
                                 IHttpContextAccessor httpContextAccessor,
                                 IHostingEnvironment hostingEnvironment)
        {
            _produtoComplementoRepositorio = produtoComplementoRepositorio;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Json(_produtoComplementoRepositorio.ObterDadosProduto());
                
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());

            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]ProdutoComplemento produtoComplemento)
        {
            try
            {
                produtoComplemento.Validate();
                if(!produtoComplemento.EhValido)
                {
                    return BadRequest(produtoComplemento.ObterMensagensValidacao());
                }

                if (produtoComplemento.Id > 0)
                {
                    _produtoComplementoRepositorio.Atualizar(produtoComplemento);
                }
                else
                {
                    _produtoComplementoRepositorio.Adicionar(produtoComplemento);
                }
                
                return Created("api/produtoComplemento", produtoComplemento);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());

            }
        }

        [HttpPost("Deletar")]
        public IActionResult Deletar([FromBody] ProdutoComplemento produtoComplemento)
        {
            try
            {
                /// produto da requisicao deve tar a propriedade do Id > 0 para conseguir remover.
                _produtoComplementoRepositorio.Remover(produtoComplemento);
                return Json(_produtoComplementoRepositorio.ObterTodos());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost("enviarArquivo")]
        public IActionResult EnviarArquivo()
        {
            try
            {
                var formFile = _httpContextAccessor.HttpContext.Request.Form.Files["arquivoEnviado"];
                var nomeArquivo = formFile.FileName;
                var extensao = nomeArquivo.Split(".").Last();
                string novoNomeArquivo = GerarNovoNomeArquivo(nomeArquivo, extensao);
                var pastaArquivos = _hostingEnvironment.WebRootPath + "\\arquivos\\";
                var nomeCompleto = pastaArquivos + novoNomeArquivo;

                using (var streamArquivo = new FileStream(nomeCompleto, FileMode.Create))
                {
                    formFile.CopyTo(streamArquivo);
                }

                return Json(novoNomeArquivo);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.ToString());
            }
        }

        [HttpPost("DeletarArquivos")]
        public IActionResult DeletarArquivos([FromBody] ProdutoComplemento produtoComplemento)
        {
            try
            {
                var pastaArquivos = _hostingEnvironment.WebRootPath + "\\arquivos\\";
                System.IO.File.Delete(pastaArquivos + produtoComplemento.NomeArquivo);
                /// produto da requisicao deve tar a propriedade do Id > 0 para conseguir remover.
                //_produtoComplementoRepositorio.Remover(produtoComplemento);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        private static string GerarNovoNomeArquivo(string nomeArquivo, string extensao)
        {
            var arrayNomeCampacto = Path.GetFileNameWithoutExtension(nomeArquivo).Take(10).ToArray();
            var novoNomeArquivo = new string(arrayNomeCampacto).Replace(" ", "-");
            novoNomeArquivo = $"{novoNomeArquivo}_{DateTime.Now.Year}{DateTime.Now.Month}{DateTime.Now.Day}{DateTime.Now.Hour}{DateTime.Now.Minute}{DateTime.Now.Second}.{extensao}";
            return novoNomeArquivo;
        }
    }
}

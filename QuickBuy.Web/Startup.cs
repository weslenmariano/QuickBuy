using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Repositorio.Contexto;
using QuickBuy.Repositorio.Repositorios;

namespace QuickBuy.Web
{
    public class Startup
    {

        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            var builder = new ConfigurationBuilder();
            builder.AddJsonFile("config.json", optional:false, reloadOnChange: true);
            Configuration = builder.Build();
        }

        

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddJsonOptions(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            var connectionString = Configuration.GetConnectionString("QuickBuyDB");
            services.AddDbContext<QuickBuyContexto>(option => 
                                                        option.UseLazyLoadingProxies()
                                                              .UseMySql(connectionString, m => 
                                                                                                m.MigrationsAssembly("QuickBuy.Repositorio")));
            services.AddScoped<IProdutoRepositorio, ProdutoRepositorio>();
            services.AddScoped<IUsuarioRepositorio, UsuarioRepositorio>();
            services.AddScoped<IPedidoRepositorio, PedidoRepositorio>();
            services.AddScoped<IUsuarioDadosRepositorio, UsuarioDadosRepositorio>();
            services.AddScoped<IProdutoComplementoRepositorio, ProdutoComplementoRepositorio>();
            services.AddScoped<IProdutoCategoriaRepositorio, ProdutoCategoriaRepositorio>();
            services.AddScoped<IProdutoHistoricoRepositorio, ProdutoHistoricoRepositorio>();
            services.AddScoped<ICategoriaHistoricoRepositorio, CategoriaHistoricoRepositorio>();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            // da a possiblidade para trabalhar com midleware do angular com a compilacao do apnet core
            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    // usando o cliserver aqui as vezes da erro de compilacao devido a sincronia do dotnetcore com o angular.
                     // spa.UseAngularCliServer(npmScript: "start");

                    // como alternativa pode ser rodado o angular saparadamente. -- ClientApp
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200/");
                }
            });
        }
        /*
        git
        Criacao branch
        git checkout -b feature/RT-101-Alterações-Front-Otimizacoes-Rota

        Commitar Ajustes
        git commit -m"RT-154 Incluir checkbox para incluir a data de agendamento"

        Enviar Git
        git push

        Buscar do Git
        git pull
        */
        // sequencia da chamada do projeto angular
        // compoente.html ->componente.ts -> servico.ts -> api/controller(ProdutoController).
        // api/controller por sua vez referencia o backend
    }
}

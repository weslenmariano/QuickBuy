import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TruncateModule } from 'ng2-truncate';
import { NgxMaskModule } from 'ngx-mask';
//import { PopupModule } from 'ng2-opd-popup';// error TS2416: -> Try removing the folder: //$ rm - fr node_modules / ng2 - opd - popup / node_modules
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ProdutoComponent } from './produto/cadastro/produto.component';
import { LoginComponent } from './usuario/login/login.component';
import { GuardaRotas } from './autorizacao/guarda.rotas';
import { UsuarioServico } from './servicos/usuario/usuario.servico';
import { CadastroUsuarioComponent } from './usuario/cadastro/cadastro.usuario.component';
import { ProdutoServico } from './servicos/produto/produto.servico';
import { PesquisaProdutoComponent } from './produto/pesquisa/pesquisa.produto.component';
import { LojaPesquisaComponent } from './loja/pesquisa/loja.pesquisa.component';
import { LojaProdutoComponent } from './loja/produto/loja.produto.component';
import { LojaEfetivarComponent } from './loja/efetivar/loja.efetivar.component';
import { PedidoServico } from './servicos/pedido/pedido.servico';
import { LojaCompraRealizadaComponent } from './loja/efetivar/loja.compra.realizada.component';
import { DadosUsuarioComponent } from './usuario/dadosUsuario/dados.usuario.component';
import { UsuarioDadosServico } from './servicos/usuario/usuarioDados.servico';
import { GuardaAdmRotas } from './autorizacao/guarda.adm.rotas';
import { CategoriaComponent } from './produto/cadastro/categoria.component';

import { ProdutoHistoricoServico } from './servicos/produto/produtoHistorico.servico';
import { ProdutoCategoriaHistoricoServico } from './servicos/produto/produtoCategoriaHistorico.servico';





/* Custom Hammer configuration */
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

export class CustomHammerConfig extends HammerGestureConfig {
    overrides = {
        'pan': {
            direction: Hammer.DIRECTION_ALL,
        }
    }
}
/* End Custom hammer configuration */

import { NgxGalleryModule } from 'ngx-gallery';
import { ProdutoComplementoServico } from './servicos/produto/produtoComplemento.servico';
import { ProdutoCategoriaServico } from './servicos/produto/produtoCategoria.servico';
import { PesquisaCategoriaComponent } from './produto/pesquisa/pesquisa.categoria.component';
/* import { NgSelectModule } from '@ng-select/ng-select'; // npm i -s @ng-select/ng-select@latest rxjs-compat */
 

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        ProdutoComponent,
        LoginComponent,
        CadastroUsuarioComponent,
        PesquisaProdutoComponent,
        LojaPesquisaComponent,
        LojaProdutoComponent,
        LojaEfetivarComponent,
        LojaCompraRealizadaComponent,
        DadosUsuarioComponent,
        CategoriaComponent,
        PesquisaCategoriaComponent,
        

    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
 //       NgSelectModule,
        NgxGalleryModule,
        Ng2ImgMaxModule,
        NgxPaginationModule,
        TruncateModule,
        BrowserAnimationsModule,
 //       PopupModule.forRoot(),
        NgxMaskModule.forRoot(),
        RouterModule.forRoot([
            { path: '', component: HomeComponent, pathMatch: 'full' },
            //{ path: 'produto', component: ProdutoComponent },
            { path: 'produto', component: ProdutoComponent, canActivate: [GuardaAdmRotas] },
            { path: 'entrar', component: LoginComponent },
            { path: 'novo-usuario', component: CadastroUsuarioComponent },
            { path: 'pesquisar-produto', component: PesquisaProdutoComponent, canActivate: [GuardaAdmRotas]},
            { path: 'loja-produto', component: LojaProdutoComponent },
            { path: 'loja-efetivar', component: LojaEfetivarComponent, canActivate: [GuardaRotas] },
            { path: 'compra-realizada-sucesso', component: LojaCompraRealizadaComponent },
            { path: 'usuario-dados', component: DadosUsuarioComponent, canActivate: [GuardaRotas] },
            { path: 'categoria', component: CategoriaComponent, canActivate: [GuardaAdmRotas] },
          { path: 'pesquisa-categoria', component: PesquisaCategoriaComponent, canActivate: [GuardaAdmRotas] },
          

        ])
    ],
    providers: [UsuarioServico, PedidoServico,
                ProdutoServico, ProdutoComplementoServico, ProdutoHistoricoServico, ProdutoCategoriaHistoricoServico,
                ProdutoCategoriaServico, UsuarioDadosServico, { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }],
    bootstrap: [AppComponent]
})
export class AppModule { }

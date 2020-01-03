import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TruncateModule } from 'ng2-truncate';
import { NgxMaskModule } from 'ngx-mask';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ProdutoComponent } from './produto/produto.component';
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

    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        TruncateModule,
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
            { path: 'usuario-dados', component: DadosUsuarioComponent, canActivate: [GuardaRotas]  }

        ])
    ],
    providers: [UsuarioServico, ProdutoServico, PedidoServico,UsuarioDadosServico],
    bootstrap: [AppComponent]
})
export class AppModule { }

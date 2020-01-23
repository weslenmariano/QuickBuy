import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { UsuarioServico } from "../servicos/usuario/usuario.servico";


@Injectable({
    providedIn:'root'
})
export class GuardaRotas implements CanActivate {

    // private router: Router
    constructor(private router: Router, private usuarioServico: UsuarioServico) {
        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean // | import("rxjs").Observable<boolean> | Promise<boolean>
    {
        //this.usuarioServico
       

        if (this.usuarioServico.usuario_autenticado()) {
            
            return true;
        }
        //alert(state.url);
        //-----------------para onde vai navegar,// de onde esta vindo a navegação
        this.router.navigate(['/entrar'], { queryParams: {returnUrl:state.url} });
        //throw new Error("Method not implemented.");
        //se usuario autenticado
        return false;
    }

    
    
    

}

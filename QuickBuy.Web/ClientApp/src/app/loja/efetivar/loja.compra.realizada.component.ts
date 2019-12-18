import { Component, OnInit } from "@angular/core";

@Component({
    selector: "compra-realizada",
    templateUrl: "./loja.compra.realizada.component.html",
    styleUrls: ["./loja.compra.realizada.component.css"]
})

export class LojaCompraRealizadaComponent implements OnInit {

    public pedidoId: string;

    ngOnInit(): void {
        this.pedidoId = sessionStorage.getItem("pedidoId");
    }

}

﻿using QuickBuy.Dominio.ObjetoDeValor;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QuickBuy.Dominio.Entidades
{
    public class Pedido : Entidade
    {
        public int Id { get; set; }
        public DateTime DataPedido { get; set; }
        /// <summary>
        /// por convencao para o relacionamento entre entidades... dessa forma
        /// a proprieade de nome composto Usuario+Id o entity framework entende que a propriedade
        /// virtual Usuario Usuario é parte de um relacionamento com outra entidade, no caso sera o Usuario.
        /// </summary>
        public int UsuarioId { get; set; }
        public virtual Usuario Usuario { get; set; }

        public DateTime DataPrevisaoEntrega { get; set; }
        public string CEP { get; set; }
        public string Estado { get; set; }
        public string Cidade { get; set; }
        public string EnderecoCompleto { get; set; }
        public int NumeroEndereco { get; set; }

        public int FormaPagamentoId { get; set; }
        public virtual FormaPagamento FormaPagamento { get; set; }

        /// <summary>
        ///  pedido deve ter pelo menos um item de pedido ou muitos itens de pedidos
        /// </summary>

        public virtual ICollection<ItemPedido> ItensPedidos { get; set; }

        public override void Validate()
        {
            LimparMensagensValidacao();

            if (!ItensPedidos.Any())
                AdicionarCritica("Crítica: Pedido nao pode ser vazio! Não foi encontrado Itens de pedido.");

            if (string.IsNullOrEmpty(CEP))
                AdicionarCritica("Crítica: CEP nao pode ser vazio!");

            if (FormaPagamentoId == 0)
                AdicionarCritica("Crítica: Não foi informado a forma de pagamento.");
        }
    }
}

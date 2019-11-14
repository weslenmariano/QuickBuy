// ctrl+r ctrl+g limpa referencias nao utilizadas 

using System;
using System.Collections.Generic;
using System.Text;


namespace QuickBuy.Dominio.Entidades
{
    public class Usuario : Entidade
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Nome { get; set; }
        public string SobreNome { get; set; }

        /// <summary>
        /// O usuario pode ter nenhum ou muitos pedidos
        /// </summary>
        public virtual ICollection<Pedido> Pedidos { get; set; }

        public override void Validate()
        {
            if (string.IsNullOrEmpty(Email))
                AdicionarCritica("Crítica: Email nao pode ser vazio!");

            if (string.IsNullOrEmpty(Senha))
                AdicionarCritica("Crítica: Senha nao pode ser vazio!");
        }
    }
}

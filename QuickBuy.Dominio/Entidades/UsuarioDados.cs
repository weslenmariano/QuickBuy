using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Dominio.Entidades
{
    public class UsuarioDados : Entidade
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public virtual Usuario Usuario { get; set; }
        public string NomeCompleto { get; set; }
        public string Rg { get; set; }
        public string Cpf { get; set; }
        public string DataNascimento { get; set; }
        public string TelefoneFixo { get; set; }
        public string TelefoneMovel { get; set; }
        public string EnderecoResidencial { get; set; }
        public int NumeroResidencial { get; set; }
        public string ComplementoResidencial { get; set; }
        public string CEP { get; set; }
        public string Estado { get; set; }
        public string Cidade { get; set; }


        public override void Validate()
        {
            LimparMensagensValidacao();

            if (string.IsNullOrEmpty(NomeCompleto))
                AdicionarCritica("Nome Completo não pode ser vazio!");

            if (string.IsNullOrEmpty(Rg))
                AdicionarCritica("RG não pode ser vazio!");

            if (string.IsNullOrEmpty(Cpf))
                AdicionarCritica("Cpf não pode ser vazio!");
            
            if (string.IsNullOrEmpty(EnderecoResidencial))
                AdicionarCritica("Endereço Residencial Fixo não pode ser vazio!");

            if (NumeroResidencial.Equals(null))
                AdicionarCritica("Número Residencial não pode ser vazio!");

            if (string.IsNullOrEmpty(ComplementoResidencial))
                AdicionarCritica("Complemento Residencial não pode ser vazio!");

            if (string.IsNullOrEmpty(CEP))
                AdicionarCritica("CEP não pode ser vazio!");

            if (string.IsNullOrEmpty(Estado))
                AdicionarCritica("Estado não pode ser vazio!");

            if (string.IsNullOrEmpty(Cidade))
                AdicionarCritica("Cidade não pode ser vazio!");
        }
    }
}

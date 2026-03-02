using AutoMapper;
using ProjetoTeste.Application.Features.Produto.Commands.CreateProduto;
using ProjetoTeste.Application.Features.Produto.Commands.UpdateProduto;
using ProjetoTeste.Application.Features.Produto.Queries.GetAllProduto;
using ProjetoTeste.Application.Features.Produto.Queries.GetProdutoDetails;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Teste.Domain;

namespace ProjetoTeste.Application.MappingProfiles
{
    public class ProdutoProfile : Profile
    {
        public ProdutoProfile()
        {
            CreateMap<Produto, ProdutoDto>().ReverseMap();
            CreateMap<Produto, ProdutoDetailsDto>();
            CreateMap<CreateProdutoCommand, Produto>();
            CreateMap<UpdateProdutoCommand, Produto>();
        }
    }
}
